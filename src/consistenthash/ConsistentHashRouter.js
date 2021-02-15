const {hex_md5} = require('./md5');

class ConsistentRealNode {
    constructor(nodeKey) {
        this.nodeKey = nodeKey;
    }
    getNodeKey() {
        return this.nodeKey;
    }
}

function toHashNumber(str) {
    let md5Str = hex_md5(str);
    return BigInt("0x" + md5Str);
}

class VirtualNode {
    constructor(readNode, index) {
        this.readNode = readNode;
        this.vNodeKey = readNode.nodeKey + "@#$%(*&^%" + index;
        this.vNodeKeyNumber = toHashNumber(this.vNodeKey);
    }
}


class ConsistentHashRouter {
    constructor(realNodeList, virtualNodePerCount) {
        this.realNodeList = realNodeList;
        this.virtualNodePerCount = virtualNodePerCount;
        this.virtualNodeList = this.buildVirtualNodeList(realNodeList, virtualNodePerCount);
    }

    buildVirtualNodeList(realNodeList, virtualNodePerCount) {
        let virtualNodeList = [];
        for (let i = 0; i < realNodeList.length; i++) {
            const readNode = realNodeList[i];
            for (let j = 0; j < virtualNodePerCount; j++) {
                let vNode = new VirtualNode(readNode, j);
                virtualNodeList.push(vNode);
            }
        }
        return virtualNodeList.sort(function (vNode1, vNode2) {
            if (vNode1.vNodeKeyNumber < vNode2.vNodeKeyNumber){
                return -1;
            }
            if (vNode1.vNodeKeyNumber > vNode2.vNodeKeyNumber){
                return 1;
            }
            return 1;
        });
    }


    routeNode(objectKey) {
        let hashNumber = toHashNumber(objectKey);
        let virtualNodeList = this.virtualNodeList || [];
        if (virtualNodeList.length === 0) {
            return null;
        }

        for (let i = 0; i < virtualNodeList.length; i++) {
            const virtualNode = virtualNodeList[i];
            if (virtualNode.vNodeKeyNumber > hashNumber) {
                return virtualNode.readNode;
            }
        }
        return virtualNodeList[0].readNode;
    }

}

module.exports = {
    ConsistentHashRouter,
    ConsistentRealNode
}