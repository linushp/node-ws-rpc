const {WsRpcServer} = require('../src/ws-rpc-server');

const wss = new WsRpcServer({
    port: 8080
})

var respIndex = 0;
wss.handle("hello", function (req){
    const {reqId,payloadString} = req;
    // console.log("reqId:"+reqId+"   " +payloadString);
    if (respIndex%1000 ===0){
        console.log(respIndex)
    }
    return "ok from server " + (respIndex++)
});

wss.handle("sendMsgToUser", function (req){

});

wss.handle("xxx",function (req){

});