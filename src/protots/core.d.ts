import * as $protobuf from "protobufjs";
/** Properties of a RpcRequest. */
export interface IRpcRequest {

    /** RpcRequest reqId */
    reqId?: (string|null);

    /** RpcRequest method */
    method?: (string|null);

    /** RpcRequest traceId */
    traceId?: (string|null);

    /** RpcRequest payloadBytes */
    payloadBytes?: (Uint8Array|null);

    /** RpcRequest payloadString */
    payloadString?: (string|null);

    /** RpcRequest sendTimeSecond */
    sendTimeSecond?: (number|null);
}

/** Represents a RpcRequest. */
export class RpcRequest implements IRpcRequest {

    /**
     * Constructs a new RpcRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRpcRequest);

    /** RpcRequest reqId. */
    public reqId: string;

    /** RpcRequest method. */
    public method: string;

    /** RpcRequest traceId. */
    public traceId: string;

    /** RpcRequest payloadBytes. */
    public payloadBytes: Uint8Array;

    /** RpcRequest payloadString. */
    public payloadString: string;

    /** RpcRequest sendTimeSecond. */
    public sendTimeSecond: number;

    /**
     * Creates a new RpcRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RpcRequest instance
     */
    public static create(properties?: IRpcRequest): RpcRequest;

    /**
     * Encodes the specified RpcRequest message. Does not implicitly {@link RpcRequest.verify|verify} messages.
     * @param message RpcRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRpcRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RpcRequest message, length delimited. Does not implicitly {@link RpcRequest.verify|verify} messages.
     * @param message RpcRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRpcRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RpcRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RpcRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RpcRequest;

    /**
     * Decodes a RpcRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RpcRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RpcRequest;

    /**
     * Verifies a RpcRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RpcRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RpcRequest
     */
    public static fromObject(object: { [k: string]: any }): RpcRequest;

    /**
     * Creates a plain object from a RpcRequest message. Also converts values to other types if specified.
     * @param message RpcRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RpcRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RpcRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a RpcResponse. */
export interface IRpcResponse {

    /** RpcResponse reqId */
    reqId?: (string|null);

    /** RpcResponse method */
    method?: (string|null);

    /** RpcResponse traceId */
    traceId?: (string|null);

    /** RpcResponse payloadBytes */
    payloadBytes?: (Uint8Array|null);

    /** RpcResponse payloadString */
    payloadString?: (string|null);

    /** RpcResponse sendTimeSecond */
    sendTimeSecond?: (number|null);

    /** RpcResponse code */
    code?: (number|null);

    /** RpcResponse message */
    message?: (string|null);
}

/** Represents a RpcResponse. */
export class RpcResponse implements IRpcResponse {

    /**
     * Constructs a new RpcResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRpcResponse);

    /** RpcResponse reqId. */
    public reqId: string;

    /** RpcResponse method. */
    public method: string;

    /** RpcResponse traceId. */
    public traceId: string;

    /** RpcResponse payloadBytes. */
    public payloadBytes: Uint8Array;

    /** RpcResponse payloadString. */
    public payloadString: string;

    /** RpcResponse sendTimeSecond. */
    public sendTimeSecond: number;

    /** RpcResponse code. */
    public code: number;

    /** RpcResponse message. */
    public message: string;

    /**
     * Creates a new RpcResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RpcResponse instance
     */
    public static create(properties?: IRpcResponse): RpcResponse;

    /**
     * Encodes the specified RpcResponse message. Does not implicitly {@link RpcResponse.verify|verify} messages.
     * @param message RpcResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRpcResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RpcResponse message, length delimited. Does not implicitly {@link RpcResponse.verify|verify} messages.
     * @param message RpcResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRpcResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RpcResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RpcResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RpcResponse;

    /**
     * Decodes a RpcResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RpcResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RpcResponse;

    /**
     * Verifies a RpcResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RpcResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RpcResponse
     */
    public static fromObject(object: { [k: string]: any }): RpcResponse;

    /**
     * Creates a plain object from a RpcResponse message. Also converts values to other types if specified.
     * @param message RpcResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RpcResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RpcResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
