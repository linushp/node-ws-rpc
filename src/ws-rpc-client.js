const WebSocket = require('ws');
const {uniqueId, nowSecond} = require("./utils");
const {RpcResponse, RpcRequest, RpcErrCode} = require('./protots/core');

class WsRpcClient {

    constructor(wsUrl) {
        this.wsUrl = wsUrl;
        this.reqBuffer = {};
        this.reqBufferLength = 0;
        this.ws = null;
        this.openWebSocket();
        this.tryOpenTimer = 0;
        this.promiseCallbacks = {};
        this.config = {
            resendIntervalSecond: 20,//尝试重试时间间隔
            maxResendTimes: 3 ,//最多尝试次数
            maxWaitCount: 100000 //队列最大容量
        };
        setInterval(() => {
            this._tryFlushBuffer();
        }, 1000)
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
        this.reqBufferLength--;
        const eventName = "req" + resp.reqId;
        const callback = this.promiseCallbacks[eventName];
        if (callback) {
            const {resolve, reject} = callback;
            delete this.promiseCallbacks[eventName];
            console.log("buffer length : " + this.reqBufferLength)
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

    async sendRpcCall(method, payload) {

        if (this.reqBufferLength > this.config.maxWaitCount){
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
            sendCount: 0
        };

        if (typeof payload === 'string') {
            req.payloadString = payload;
        } else {
            req.payloadBytes = payload;
        }

        const eventName = "req" + reqId;


        return new Promise((resolve, reject) => {
            this.promiseCallbacks[eventName] = {
                resolve: resolve,
                reject: reject
            };
            this.reqBuffer[reqId] = req;
            this.reqBufferLength++;
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

}

module.exports = {
    WsRpcClient
}