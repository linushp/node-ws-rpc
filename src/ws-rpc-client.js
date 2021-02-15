const WebSocket = require('ws');
const {uniqueId, nowSecond} = require("./utils");
const {RpcResponse, RpcRequest} = require('./protots/core');

class WsRpcClient {

    constructor(wsUrl) {
        this.wsUrl = wsUrl;
        this.reqBuffer = {};
        this.ws = null;
        this.openWebSocket();
        this.tryOpenTimer = 0;
        this.promiseCallbacks = {};
        setInterval(()=>{
            this._tryFlushBuffer();
        },1000)
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
        delete this.reqBuffer[resp.reqId];
        const eventName = "req" + resp.reqId;
        const callback = this.promiseCallbacks[eventName];
        if (callback) {
            const {resolve, reject} = callback;
            delete this.promiseCallbacks[eventName];
            // console.log("buffer length : " + Object.keys(this.reqBuffer).length)
            if (resp.code === 0) {
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
        const reqId = uniqueId();
        const req = {
            reqId: reqId,
            method: method,
            sendTimeSecond: 0
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
                reqObj.sendTimeSecond = nowSecond();
                const eRpc = RpcRequest.encode(reqObj);
                const data = eRpc.finish();
                ws?.send(data, {binary: true});
            }
        }
    }

    _isNeedSend(reqObj) {
        return (reqObj.sendTimeSecond + 30) < nowSecond();
    }

}

module.exports = {
    WsRpcClient
}