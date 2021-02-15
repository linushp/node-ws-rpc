const WebSocket = require('ws');
const {nowSecond} = require("./utils");
const {RpcRequest, RpcResponse} = require('./protots/core');

class WsRpcServer {
    constructor(serverOptions) {
        this._wss = new WebSocket.Server(serverOptions);
        this._initWss();
        this._reqestHandlers = {};
    }


    _initWss = () => {
        const rpcServer = this;
        const wss = this._wss
        wss.on('connection', function connection(ws) {
            ws.on('message', async function incoming(message) {
                try {
                    await rpcServer._handleIncomingMessage(ws, message);
                } catch (e) {
                    console.log(e.message);
                }
            });
        });
    }

    handle = (method, handler) => {
        this._reqestHandlers[method] = handler;
    };

    _handleIncomingMessage = async (ws, message) => {
        const req = RpcRequest.decode(message);
        const method = req.method || "";
        const handler = this._reqestHandlers[method];

        const rpcResponse = {};
        rpcResponse.reqId = req.reqId;
        rpcResponse.method = req.method;
        rpcResponse.traceId = req.traceId;
        rpcResponse.code = 0;
        rpcResponse.message = "";

        let respPayload;
        if (handler) {
            try {
                respPayload = await handler(req);
            } catch (e) {
                rpcResponse.code = e.code || 500;
                rpcResponse.message = e.message;
            }
        } else {
            rpcResponse.code = 501;
            rpcResponse.message = method + " handler is not found";
        }

        rpcResponse.sendTimeSecond = nowSecond();
        if (typeof respPayload === "string") {
            rpcResponse.payloadString = respPayload;
        } else {
            rpcResponse.payloadBytes = respPayload;
        }


        const eRpc = RpcResponse.encode(rpcResponse);
        const data = eRpc.finish();
        if (ws && ws.readyState === 1) {
            ws.send(data, {binary: true});
        } else {
            console.log("WS is closed")
        }

    }

}

module.exports = {
    WsRpcServer
}