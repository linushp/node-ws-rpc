const {WsRpcClient} = require('../src/ws-rpc-client');
const {nowSecond} = require('../src/utils');
const client = new WsRpcClient("ws://127.0.0.1:8080");

const beginTime = nowSecond();


async function loop(){
    for (let i = 0; i < 10; i++) {
        await client.sendRpcCall('hello', "aaaa: "+ i);
    }
    try {
        let resp = await client.sendRpcCall('hello', "何鲁丽的😊热");
        console.log(resp);
    }catch (e){
        console.error(e);
    }
    console.log("cost : " +( nowSecond() - beginTime))

}

async function loop2(){
    while (true){
        await loop();
    }
}

loop2();

// setInterval(async function (){
//
// },1000);