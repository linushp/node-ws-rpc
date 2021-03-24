import {IRpcRequest, IRpcResponse, RpcErrCode} from "./src/protots/core";

export  {
    IRpcRequest,
    IRpcResponse,
    RpcErrCode
}

export declare class WsRpcServer {
    public constructor(serverOptions: any);

    public handle(method: string, handler: (req: IRpcRequest) => any): any;
}

export declare interface WsRpcClientConfig {
    resendIntervalSecond?: number;//尝试重试时间间隔
    maxResendTimes?: number;//最多尝试次数
    maxWaitCount?: number; //队列最大容量
}

export declare interface RpcCallParams {
    method: string,
    payload: any, //bytes或者string
    traceId?: string,
    uid?: number
}


export declare class WsRpcClient {
    public constructor(wsUrl: string);

    /**
     * Rpc调用，异步回调，等待重试机制
     * @param params
     */
    public sendRpcCall(params: RpcCallParams): Promise<IRpcResponse>;

    /**
     * 立即发送消息，无需回调，无需等待WS状态
     * @param params
     */
    public sendMessage(params: RpcCallParams): any;

    /**
     * 设置配置项
     * @param config
     */
    public setConfig(config: WsRpcClientConfig): any;
}

export declare interface IndexMap {
    [key: string]: number;
}

export declare interface ServiceMap {
    [key: string]: WsRpcClient[];
}

export interface GroupAddressMap{
    [key: string]: any[];
}

export declare class WsRpcClientPool {
    public constructor();

    public createClient(serviceName: string, address: string, clientCount?: number): void;

    public getClientMapByServiceName(serviceName: string): ServiceMap;

    public getIndexMapByServiceName(serviceName: string): IndexMap;

    public getClientListByAddress(serviceMap: ServiceMap, address: string): WsRpcClient[];

    public getIndexByAddress(serviceMap: ServiceMap, address: string): number;

    public getClient(serviceName: string): WsRpcClient | null;

    public getClient2(serviceName: string, objectKey: any): WsRpcClient | null;

    public getClientByAddress(serviceName: string, address: string): WsRpcClient | null;

    //返回address数组
    public getAllAddressListByServiceName(serviceName: string): string[];

    /**
     * 工具函数：
     * 使用一致性hash算法 将Object keys 分组
     * 方便批量处理大量数据，分组后可以批量发送
     *
     * @param serviceName   服务名
     * @param objectKeyList 用来做一致性hash的对象key
     * @return 返回的map的结构是这样的 <address,List<ObjectKey>>
     */
    public groupAddressOfKeys(serviceName:string, objectKeyList:any[]): GroupAddressMap;
}

export declare const wsRpcClientPool: WsRpcClientPool;