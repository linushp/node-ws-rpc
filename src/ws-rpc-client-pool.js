const {ConsistentHashRouter, ConsistentRealNode} = require("./consistenthash/ConsistentHashRouter");
const {WsRpcClient} = require('./ws-rpc-client');


function computeIfAbsent(map, key, func) {
    let value = map[key];
    if (typeof value === 'undefined') {
        value = func();
        map[key] = value;
    }
    return value;
}


/**
 * 单线程发送消息到服务端
 * 多线程发送消息到此客户端
 * 一个Service可以是一个集群，所以一个ServiceName会有多个Address
 * 一个Address可以建立多个连接，所以一个Address会有多个Client
 */
class WsRpcClientPool {

    constructor() {
        //<ServiceName,<Address,List<Client>>>
        this.allClients = {};

        //<ServiceName,<Address,Index>>
        this.lastClientIndexes = {};

        //<ServiceName,ConsistentHashRouter>
        this.consistentHashRouterMap = {};
    }


    /**
     * 创建一个Client
     *
     * @param serviceName 服务名
     * @param address 服务地址，如：tcp://localhost:5555
     * @param clientCount 每个address创建多少个client连接
     */
    createClient(serviceName, address, clientCount = 1) {
        let serviceMap = this.getClientMapByServiceName(serviceName);
        let clients = this.getClientListByAddress(serviceMap, address);
        for (let i = 0; i < clientCount; i++) {
            clients.push(new WsRpcClient(address));
        }
        this.buildConsistentHash();
    }

    /**
     * 创建一致性hash关系
     */
    buildConsistentHash() {
        const serviceNameList = Object.keys(this.allClients);
        for (let i = 0; i < serviceNameList.length; i++) {
            const serviceName = serviceNameList[i];
            const addressClients = this.allClients[serviceName];
            const addressList = Object.keys(addressClients);
            const consistentHashNodes = this.toConsistentHashNodes(addressList);
            this.consistentHashRouterMap[serviceName] = new ConsistentHashRouter(consistentHashNodes, 100);//10 virtual node
        }
    }


    toConsistentHashNodes(addressList) {
        let nodeList = []
        for (let i = 0; i < addressList.length; i++) {
            const address = addressList[i];
            nodeList.push(new ConsistentRealNode(address));
        }
        return nodeList;
    }


    getClientMapByServiceName(serviceName) {
        let allClients = this.allClients;
        let client = allClients[serviceName];
        if (!client) {
            client = {};
            allClients[serviceName] = client;
        }
        return client;
    }

    getIndexMapByServiceName(serviceName) {
        let lastClientIndexes = this.lastClientIndexes;
        let indexMap = lastClientIndexes[serviceName];
        if (!indexMap) {
            indexMap = {};
            lastClientIndexes[serviceName] = indexMap;
        }
        return indexMap;
    }


    getClientListByAddress(serviceMap, address) {

        let clientList = serviceMap[address];
        if (!clientList) {
            clientList = [];
            serviceMap[address] = clientList;
        }
        return clientList;
    }

    getIndexByAddress(serviceMap, address) {
        let index = serviceMap[address];
        if (!index) {
            index = 0;
            serviceMap[address] = index;
        }
        return index;
    }


    /**
     * 随机获取一个address
     * 然后再使用round robin找到其中一个Client
     *
     * @param serviceName 服务名
     * @return ZeroRpcClient实例
     */

    getClient(serviceName) {
        return this.getClient2(serviceName, Math.random());
    }

    /**
     * 通过一致性hash算法，算出address
     * 然后再使用round robin找到其中一个Client
     *
     * @param serviceName 服务名
     * @param objectKey   用来做一致性hash的对象key
     * @return ZeroRpcClient实例
     */
    getClient2(serviceName, objectKey) {
        let consistentHashRouter = this.consistentHashRouterMap[serviceName];
        if (!consistentHashRouter) {
            console.error("[WsRpcClientPool][getClient2]consistentHashRouter is null of " + serviceName);
            return null;
        }
        let routeNode = consistentHashRouter.routeNode(objectKey);
        if (routeNode == null) {
            console.error("[WsRpcClientPool][getClient2]routeNode is null of " + serviceName + " , " + objectKey);
            return null;
        }

        let address = routeNode.getNodeKey();
        return this.getClientByAddress(serviceName, address);
    }


    getClientByAddress(serviceName, address) {
        let serviceClients = this.allClients[serviceName];
        if (!serviceClients) {
            console.error("[WsRpcClientPool][getClientByAddress]serviceClients is null of " + serviceName);
            return null;
        }

        let addressClients = serviceClients[address];
        if (!addressClients) {
            console.error("[WsRpcClientPool][getClientByAddress]addressClients is null of " + serviceName + " , " + address);
            return null;
        }

        let serviceClientIndexes = this.getIndexMapByServiceName(serviceName);
        let index = this.getIndexByAddress(serviceClientIndexes, address);
        index = (index + 1) % addressClients.length;
        let client = addressClients[index];
        serviceClientIndexes[address] = index;
        return client;
    }


    getAllAddressListByServiceName(serviceName) {
        let serviceClients = this.allClients[serviceName];
        if (!serviceClients) {
            console.error("[WsRpcClientPool][getAllAddressListByServiceName] serviceClients is null of " + serviceName);
            return [];
        }
        return Object.keys(serviceClients);
    }

    groupAddressOfKeys(serviceName, objectKeyList) {
        let consistentHashRouter = this.consistentHashRouterMap[serviceName];

        if (consistentHashRouter == null) {
            console.error("[WsRpcClientPool][groupAddressOfKeys] consistentHashRouter is null of " + serviceName);
            return {}
        }

        let map = {};

        for (let i = 0; i < objectKeyList.length; i++) {
            let key = objectKeyList[i];
            const keyString = "" + key;

            let routeNode = consistentHashRouter.routeNode(keyString);
            if (routeNode != null) {
                let address = routeNode.getNodeKey();
                let keyArr = computeIfAbsent(map, address, () => []);
                keyArr.add(key);
            }
        }
        return map;
    }


}


const wsRpcClientPool = new WsRpcClientPool();

module.exports = {
    WsRpcClientPool,
    wsRpcClientPool
}