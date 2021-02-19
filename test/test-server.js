const {WsRpcServer} = require('../src/ws-rpc-server');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;


if (cluster.isMaster) {
    console.log(`主进程 ${process.pid} 正在运行`);

    // 衍生工作进程。
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`工作进程 ${worker.process.pid} 已退出`);
    });


} else {





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
        if (respIndex % 10001 === 0) {
            console.log(process.pid,respIndex, req)
        }
    });


}