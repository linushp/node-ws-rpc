import {IRpcRequest, IRpcResponse} from "./src/protots/core";


export declare class WsRpcServer {
    public constructor(serverOptions: any);

    public handle(method: string, handler: (req: IRpcRequest) => {});
}

export declare class WsRpcClient {
    public constructor(wsUrl: string);

    public sendRpcCall(method: string, payload: any): Promise<IRpcResponse>;
}

export declare interface IndexMap {
    [key: string]: number;
}

export declare interface ServiceMap {
    [key: string]: WsRpcClient[];
}

export declare class WsRpcClientPool {
    public constructor();

    public createClient(serviceName: string, address: string, clientCount?: number);

    public getClientMapByServiceName(serviceName: string): WsRpcClient | null;

    public getIndexMapByServiceName(serviceName: string): IndexMap;

    public getClientListByAddress(serviceMap: ServiceMap, address: string): WsRpcClient[];

    public getIndexByAddress(serviceMap: ServiceMap, address: string): number;

    public getClient(serviceName: string): WsRpcClient | null;

    public getClient2(serviceName: string, objectKey: any): WsRpcClient | null;

    public getClientByAddress(serviceName: string, address: string): WsRpcClient | null;
}

declare const wsRpcClientPool: WsRpcClientPool;