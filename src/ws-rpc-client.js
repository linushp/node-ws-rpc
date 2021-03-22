const WebSocket = require('ws');
const {uniqueId, nowSecond} = require("./utils");
const {RpcResponse, RpcRequest, RpcErrCode} = require('./protots/core');

class WsRpcClient {

    constructor(wsUrl) {
        this.wsUrl = wsUrl;
        this.reqBuffer = {};
        this.ws = null;
        this.tryOpenTimer = 0;
        this.promiseCallbacks = {};
        this.promiseWaitCount = 0;
        this.config = {
            resendIntervalSecond: 20,//尝试重试时间间隔
            maxResendTimes: 3,//最多尝试次数
            maxWaitCount: 1000 * 100 //队列最大容量
        };

        setInterval(() => {
            this._tryFlushBuffer();
        }, 1000);
        this.openWebSocket();
    }

    setConfig(config) {
        Object.assign(this.config, config || {});
    }

    openWebSocket = () => {
        if (this.ws) {
            this.ws.off('open', this.onWsOpen);
            this.ws.off('close', this.onWsClose);
            this.ws.off('error', this.onWsError);
            this.ws.off('message', this.onWsMessage);
            this.ws.close(0, "reopen");
        }

        if (this.tryOpenTimer) {
            clearTimeout(this.tryOpenTimer);
        }

        this.tryOpenTimer = setTimeout(() => {
            console.log("[openWebSocket]");
            this.ws = new WebSocket(this.wsUrl);
            this.ws.on('open', this.onWsOpen);
            this.ws.on('close', this.onWsClose);
            this.ws.on('error', this.onWsError);
            this.ws.on('message', this.onWsMessage);
        }, 1000);
    }

    onWsMessage = (datas) => {
        const resp = RpcResponse.decode(datas);
        this._onWsMessage(resp);
    }

    _onWsMessage = (resp) => {
        delete this.reqBuffer[resp.reqId];

        const eventName = "req" + resp.reqId;
        const callback = this.promiseCallbacks[eventName];
        if (callback) {
            const {resolve, reject} = callback;
            delete this.promiseCallbacks[eventName];
            this.promiseWaitCount--;
            // console.log("buffer length : " + this.promiseWaitCount)
            if (resp.code === RpcErrCode.OK) {
                resolve(resp);
            } else {
                reject(resp);
            }
        }

    }

    onWsError = (err) => {
        console.log("[onWsError] " + (err && err.code));
        this.openWebSocket();
    };

    onWsClose = () => {
        console.log('[onWsClose]')
        this.openWebSocket();
    };

    onWsOpen = () => {
        console.log('[onWsOpen]')
        this._tryFlushBuffer();
    }

    /**
     * 立即发送消息，无需回调，无需等待WS状态
     * @param method
     * @param payload
     * @param traceId 可选
     * @param uid 可选
     */
    sendMessage({method, payload, traceId, uid}) {
        this._checkWebSocketOpen();

        const ws = this.ws;
        const reqId = uniqueId();
        const req = {
            reqId: reqId,
            method: method,
            sendCount: 0,
            needResp: false,
            sendTimeSecond: nowSecond()
        };

        if (traceId) {
            req.traceId = traceId;
        }

        if (uid) {
            req.uid = uid;
        }

        if (typeof payload === 'string') {
            req.payloadString = payload;
        } else {
            req.payloadBytes = payload;
        }

        const eRpc = RpcRequest.encode(req);
        const data = eRpc.finish();
        ws?.send(data, {binary: true});
    }


    /**
     * Rpc调用，异步回调，等待重试机制
     * @param method
     * @param payload
     * @param uid 可选
     * @param traceId 可选
     * @returns {Promise<unknown>}
     */
    async sendRpcCall({method, payload, uid, traceId}) {
        this._checkWebSocketOpen();

        if (this.promiseWaitCount > this.config.maxWaitCount) {
            console.log("too many task wait this.promiseWaitCount is " + this.promiseWaitCount)
            return Promise.reject({
                code: RpcErrCode.ERROR_TOO_MANY_WAIT,
                message: 'too many task wait'
            });
        }

        const reqId = uniqueId();
        const req = {
            reqId: reqId,
            method: method,
            sendTimeSecond: 0,
            sendCount: 0,
            needResp: true,
        };

        if (uid) {
            req.uid = uid;
        }

        if (traceId) {
            req.traceId = traceId;
        }

        if (typeof payload === 'string') {
            req.payloadString = payload;
        } else {
            req.payloadBytes = payload;
        }

        const eventName = "req" + reqId;


        return new Promise((resolve, reject) => {
            this.promiseWaitCount++;
            this.promiseCallbacks[eventName] = {
                resolve: resolve,
                reject: reject
            };
            this.reqBuffer[reqId] = req;
            this._tryFlushBuffer();
        });
    }


    _tryFlushBuffer = () => {
        const ws = this.ws;
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            return;
        }

        const reqIdKeys = Object.keys(this.reqBuffer);
        for (let i = 0; i < reqIdKeys.length; i++) {
            const reqId = reqIdKeys[i];
            const reqObj = this.reqBuffer[reqId];
            if (this._isNeedSend(reqObj)) {
                //超过最大尝试次数
                if (reqObj.sendCount >= this.config.maxResendTimes) {
                    this._onWsMessage({
                        reqId: reqObj.reqId,
                        method: reqObj.method,
                        traceId: reqObj.traceId,
                        payloadBytes: null,
                        payloadString: '',
                        sendTimeSecond: nowSecond(),
                        code: RpcErrCode.ERROR_TIMEOUT,
                        message: 'over max resend time'
                    });
                } else {
                    reqObj.sendTimeSecond = nowSecond();
                    reqObj.sendCount = reqObj.sendCount + 1;
                    const eRpc = RpcRequest.encode(reqObj);
                    const data = eRpc.finish();
                    ws?.send(data, {binary: true});
                }
            }
        }
    }

    _isNeedSend(reqObj) {
        return (reqObj.sendTimeSecond + this.config.resendIntervalSecond) < nowSecond();
    }

    _checkWebSocketOpen() {
        const ws = this.ws;
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            const error = new Error("websocket is not open");
            error.code = RpcErrCode.ERROR_WS_NOT_OPEN;
            error.message = "websocket is not open";
            throw error;
        }
    }
}

module.exports = {
    WsRpcClient
}