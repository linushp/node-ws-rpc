const {WsRpcServer} = require('../src/ws-rpc-server');

const wss = new WsRpcServer({
    port: 8080
})

var respIndex = 0;
wss.handle("hello", function (req) {
    const {reqId, payloadString} = req;
    // console.log("reqId:"+reqId+"   " +payloadString);
    console.log(respIndex++)
    if (respIndex % 1000 === 0) {
        console.log(respIndex)
    }
    return "ok from server " + (respIndex)
});


wss.handle("helloMessage", function (req) {
    respIndex++
    if (respIndex % 10000 === 0) {
        console.log(respIndex, req)
    }
});