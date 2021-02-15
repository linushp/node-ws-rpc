const {WsRpcServer} = require('../src/ws-rpc-server');

const wss = new WsRpcServer({
    port: 8080
})

wss.handle("hello", function (req){
    const {reqId,payloadString} = req;
    // console.log("reqId:"+reqId+"   " +payloadString);
    return "ok from server "
});