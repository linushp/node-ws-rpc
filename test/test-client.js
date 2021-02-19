const {WsRpcClient} = require('../src/ws-rpc-client');
const {wsRpcClientPool} = require('../src/ws-rpc-client-pool');
const {nowSecond} = require('../src/utils');

function sleepMs(ms){
    return new Promise(function (resolve){
        setTimeout(function (){
            resolve()
        },ms)
    })
}

async function test() {
    try {

        const beginTime = nowSecond();

        let client = wsRpcClientPool.getClient("hello");

        for (let i = 10; i < (1000); i++) {
            try {
                let resp =  client.sendRpcCall('hello', "何鲁丽的😊热").then(function (x){
                    console.log(x);
                });
            } catch (e) {
                console.error(e);
            }
        }
         client = wsRpcClientPool.getClient("hello");
        let resp = await client.sendRpcCall('hello', "何鲁丽的😊热");
        console.log(resp);
        console.log("cost : " + (nowSecond() - beginTime))

    } catch (e) {
        console.error(e);
    }
}


async function test1(){
    wsRpcClientPool.createClient("hello", "ws://127.0.0.1:8080", 1);

    await sleepMs(1000 * 2);

    while (true){
        await test();
    }
}


// test1();


async function test2(){
    wsRpcClientPool.createClient("hello", "ws://127.0.0.1:8080", 4);

    await sleepMs(1000 * 5);

    for (var i = 0;i < 100 * 10000;i++){
        let client = wsRpcClientPool.getClient("hello");
        client.sendMessage('helloMessage',"helloMessage")
    }
}

test2();

//
// const client = new WsRpcClient("ws://127.0.0.1:8080");
//
// const beginTime = nowSecond();
//
//
// async function loop(){
//     for (let i = 0; i < 10; i++) {
//         await client.sendRpcCall('hello', "aaaa: "+ i);
//     }
//     try {
//         let resp = await client.sendRpcCall('hello', "何鲁丽的😊热");
//         console.log(resp);
//     }catch (e){
//         console.error(e);
//     }
//     console.log("cost : " +( nowSecond() - beginTime))
//
// }
//
// async function loop2(){
//     while (true){
//         await loop();
//     }
// }
//
// loop2();

// setInterval(async function (){
//
// },1000);