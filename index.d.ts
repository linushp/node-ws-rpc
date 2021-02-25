import {IRpcRequest, IRpcResponse} from "./src/protots/core";


export declare class WsRpcServer {
    public constructor(serverOptions: any);

    public handle(method: string, handler: (req: IRpcRequest) => {});
}

export declare interface WsRpcClientConfig {
    resendIntervalSecond?: number;//尝试重试时间间隔
    maxResendTimes?: number;//最多尝试次数
    maxWaitCount?: number; //队列最大容量
}

export declare class WsRpcClient {
    public constructor(wsUrl: string);

    /**
     * Rpc调用，异步回调，等待重试机制
     * @param method 调用方法名
     * @param payload bytes或者string
     * @param traceId 可选
     */
    public sendRpcCall(method: string, payload: any, traceId?: string): Promise<IRpcResponse>;

    /**
     * 立即发送消息，无需回调，无需等待WS状态
     * @param method 调用方法名
     * @param payload bytes或者string
     * @param traceId 可选
     */
    public sendMessage(method: string, payload: any, traceId?: string): void;

    /**
     * 设置配置项
     * @param config
     */
    public setConfig(config: WsRpcClientConfig): void;
}

export declare interface IndexMap {
    [key: string]: number;
}

export declare interface ServiceMap {
    [key: string]: WsRpcClient[];
}

export declare class WsRpcClientPool {
    public constructor();

    public createClient(serviceName: string, address: string, clientCount?: number): void;

    public getClientMapByServiceName(serviceName: string): WsRpcClient | null;

    public getIndexMapByServiceName(serviceName: string): IndexMap;

    public getClientListByAddress(serviceMap: ServiceMap, address: string): WsRpcClient[];

    public getIndexByAddress(serviceMap: ServiceMap, address: string): number;

    public getClient(serviceName: string): WsRpcClient | null;

    public getClient2(serviceName: string, objectKey: any): WsRpcClient | null;

    public getClientByAddress(serviceName: string, address: string): WsRpcClient | null;
}

declare const wsRpcClientPool: WsRpcClientPool;