# tiny-ws-rpc

基于WebSocket实现的RPC框架。

## 特点
1. 支持无应答的高性能瞬时消息
2. 支持有回调和重试的可靠RPC请求
3. 内置客户端池和一致性哈希算法

## 使用示例

server 端

```javascript

const {WsRpcServer} = require('../src/ws-rpc-server');


const wss = new WsRpcServer({
    port: 8080
})


//有结果回调的可开RPC
wss.handle("helloRpc", function (req) {
    return "ok from server ";
});

//没有结果回调的瞬时消息
wss.handle("helloMessage", function (req) {
    
});
```


client 端

```javascript

const {wsRpcClientPool} = require('../src/ws-rpc-client-pool');

async function test(){
    // 初始化客户端
    wsRpcClientPool.createClient("hello", "ws://127.0.0.1:8080", 1);
    
    // 发送100万条瞬时消息
    for (var i = 0;i < 100 * 10000;i++){
        let client = wsRpcClientPool.getClient("hello");
        client.sendMessage('helloMessage',"helloMessage")
    }

    let client = wsRpcClientPool.getClient("hello");
    //使用RPC回调
    let resp = await client.sendRpcCall('helloRpc', "你好");
    console.log(resp);
}


```


