/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * RpcErrCode enum.
 * @exports RpcErrCode
 * @enum {number}
 * @property {number} OK=0 OK value
 * @property {number} ERROR=500 ERROR value
 * @property {number} ERROR_NO_HANDLER=501 ERROR_NO_HANDLER value
 * @property {number} ERROR_TIMEOUT=502 ERROR_TIMEOUT value
 */
$root.RpcErrCode = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "OK"] = 0;
    values[valuesById[500] = "ERROR"] = 500;
    values[valuesById[501] = "ERROR_NO_HANDLER"] = 501;
    values[valuesById[502] = "ERROR_TIMEOUT"] = 502;
    return values;
})();

$root.RpcRequest = (function() {

    /**
     * Properties of a RpcRequest.
     * @exports IRpcRequest
     * @interface IRpcRequest
     * @property {string|null} [reqId] RpcRequest reqId
     * @property {string|null} [method] RpcRequest method
     * @property {string|null} [traceId] RpcRequest traceId
     * @property {Uint8Array|null} [payloadBytes] RpcRequest payloadBytes
     * @property {string|null} [payloadString] RpcRequest payloadString
     * @property {number|null} [sendTimeSecond] RpcRequest sendTimeSecond
     * @property {number|null} [sendCount] RpcRequest sendCount
     */

    /**
     * Constructs a new RpcRequest.
     * @exports RpcRequest
     * @classdesc Represents a RpcRequest.
     * @implements IRpcRequest
     * @constructor
     * @param {IRpcRequest=} [properties] Properties to set
     */
    function RpcRequest(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RpcRequest reqId.
     * @member {string} reqId
     * @memberof RpcRequest
     * @instance
     */
    RpcRequest.prototype.reqId = "";

    /**
     * RpcRequest method.
     * @member {string} method
     * @memberof RpcRequest
     * @instance
     */
    RpcRequest.prototype.method = "";

    /**
     * RpcRequest traceId.
     * @member {string} traceId
     * @memberof RpcRequest
     * @instance
     */
    RpcRequest.prototype.traceId = "";

    /**
     * RpcRequest payloadBytes.
     * @member {Uint8Array} payloadBytes
     * @memberof RpcRequest
     * @instance
     */
    RpcRequest.prototype.payloadBytes = $util.newBuffer([]);

    /**
     * RpcRequest payloadString.
     * @member {string} payloadString
     * @memberof RpcRequest
     * @instance
     */
    RpcRequest.prototype.payloadString = "";

    /**
     * RpcRequest sendTimeSecond.
     * @member {number} sendTimeSecond
     * @memberof RpcRequest
     * @instance
     */
    RpcRequest.prototype.sendTimeSecond = 0;

    /**
     * RpcRequest sendCount.
     * @member {number} sendCount
     * @memberof RpcRequest
     * @instance
     */
    RpcRequest.prototype.sendCount = 0;

    /**
     * Creates a new RpcRequest instance using the specified properties.
     * @function create
     * @memberof RpcRequest
     * @static
     * @param {IRpcRequest=} [properties] Properties to set
     * @returns {RpcRequest} RpcRequest instance
     */
    RpcRequest.create = function create(properties) {
        return new RpcRequest(properties);
    };

    /**
     * Encodes the specified RpcRequest message. Does not implicitly {@link RpcRequest.verify|verify} messages.
     * @function encode
     * @memberof RpcRequest
     * @static
     * @param {IRpcRequest} message RpcRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RpcRequest.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.reqId != null && Object.hasOwnProperty.call(message, "reqId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.reqId);
        if (message.method != null && Object.hasOwnProperty.call(message, "method"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.method);
        if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.traceId);
        if (message.payloadBytes != null && Object.hasOwnProperty.call(message, "payloadBytes"))
            writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.payloadBytes);
        if (message.payloadString != null && Object.hasOwnProperty.call(message, "payloadString"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.payloadString);
        if (message.sendTimeSecond != null && Object.hasOwnProperty.call(message, "sendTimeSecond"))
            writer.uint32(/* id 6, wireType 0 =*/48).int32(message.sendTimeSecond);
        if (message.sendCount != null && Object.hasOwnProperty.call(message, "sendCount"))
            writer.uint32(/* id 7, wireType 0 =*/56).int32(message.sendCount);
        return writer;
    };

    /**
     * Encodes the specified RpcRequest message, length delimited. Does not implicitly {@link RpcRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RpcRequest
     * @static
     * @param {IRpcRequest} message RpcRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RpcRequest.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RpcRequest message from the specified reader or buffer.
     * @function decode
     * @memberof RpcRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RpcRequest} RpcRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RpcRequest.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RpcRequest();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.reqId = reader.string();
                break;
            case 2:
                message.method = reader.string();
                break;
            case 3:
                message.traceId = reader.string();
                break;
            case 4:
                message.payloadBytes = reader.bytes();
                break;
            case 5:
                message.payloadString = reader.string();
                break;
            case 6:
                message.sendTimeSecond = reader.int32();
                break;
            case 7:
                message.sendCount = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RpcRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RpcRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RpcRequest} RpcRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RpcRequest.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RpcRequest message.
     * @function verify
     * @memberof RpcRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RpcRequest.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.reqId != null && message.hasOwnProperty("reqId"))
            if (!$util.isString(message.reqId))
                return "reqId: string expected";
        if (message.method != null && message.hasOwnProperty("method"))
            if (!$util.isString(message.method))
                return "method: string expected";
        if (message.traceId != null && message.hasOwnProperty("traceId"))
            if (!$util.isString(message.traceId))
                return "traceId: string expected";
        if (message.payloadBytes != null && message.hasOwnProperty("payloadBytes"))
            if (!(message.payloadBytes && typeof message.payloadBytes.length === "number" || $util.isString(message.payloadBytes)))
                return "payloadBytes: buffer expected";
        if (message.payloadString != null && message.hasOwnProperty("payloadString"))
            if (!$util.isString(message.payloadString))
                return "payloadString: string expected";
        if (message.sendTimeSecond != null && message.hasOwnProperty("sendTimeSecond"))
            if (!$util.isInteger(message.sendTimeSecond))
                return "sendTimeSecond: integer expected";
        if (message.sendCount != null && message.hasOwnProperty("sendCount"))
            if (!$util.isInteger(message.sendCount))
                return "sendCount: integer expected";
        return null;
    };

    /**
     * Creates a RpcRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RpcRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RpcRequest} RpcRequest
     */
    RpcRequest.fromObject = function fromObject(object) {
        if (object instanceof $root.RpcRequest)
            return object;
        var message = new $root.RpcRequest();
        if (object.reqId != null)
            message.reqId = String(object.reqId);
        if (object.method != null)
            message.method = String(object.method);
        if (object.traceId != null)
            message.traceId = String(object.traceId);
        if (object.payloadBytes != null)
            if (typeof object.payloadBytes === "string")
                $util.base64.decode(object.payloadBytes, message.payloadBytes = $util.newBuffer($util.base64.length(object.payloadBytes)), 0);
            else if (object.payloadBytes.length)
                message.payloadBytes = object.payloadBytes;
        if (object.payloadString != null)
            message.payloadString = String(object.payloadString);
        if (object.sendTimeSecond != null)
            message.sendTimeSecond = object.sendTimeSecond | 0;
        if (object.sendCount != null)
            message.sendCount = object.sendCount | 0;
        return message;
    };

    /**
     * Creates a plain object from a RpcRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RpcRequest
     * @static
     * @param {RpcRequest} message RpcRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RpcRequest.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.reqId = "";
            object.method = "";
            object.traceId = "";
            if (options.bytes === String)
                object.payloadBytes = "";
            else {
                object.payloadBytes = [];
                if (options.bytes !== Array)
                    object.payloadBytes = $util.newBuffer(object.payloadBytes);
            }
            object.payloadString = "";
            object.sendTimeSecond = 0;
            object.sendCount = 0;
        }
        if (message.reqId != null && message.hasOwnProperty("reqId"))
            object.reqId = message.reqId;
        if (message.method != null && message.hasOwnProperty("method"))
            object.method = message.method;
        if (message.traceId != null && message.hasOwnProperty("traceId"))
            object.traceId = message.traceId;
        if (message.payloadBytes != null && message.hasOwnProperty("payloadBytes"))
            object.payloadBytes = options.bytes === String ? $util.base64.encode(message.payloadBytes, 0, message.payloadBytes.length) : options.bytes === Array ? Array.prototype.slice.call(message.payloadBytes) : message.payloadBytes;
        if (message.payloadString != null && message.hasOwnProperty("payloadString"))
            object.payloadString = message.payloadString;
        if (message.sendTimeSecond != null && message.hasOwnProperty("sendTimeSecond"))
            object.sendTimeSecond = message.sendTimeSecond;
        if (message.sendCount != null && message.hasOwnProperty("sendCount"))
            object.sendCount = message.sendCount;
        return object;
    };

    /**
     * Converts this RpcRequest to JSON.
     * @function toJSON
     * @memberof RpcRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RpcRequest.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RpcRequest;
})();

$root.RpcResponse = (function() {

    /**
     * Properties of a RpcResponse.
     * @exports IRpcResponse
     * @interface IRpcResponse
     * @property {string|null} [reqId] RpcResponse reqId
     * @property {string|null} [method] RpcResponse method
     * @property {string|null} [traceId] RpcResponse traceId
     * @property {Uint8Array|null} [payloadBytes] RpcResponse payloadBytes
     * @property {string|null} [payloadString] RpcResponse payloadString
     * @property {number|null} [sendTimeSecond] RpcResponse sendTimeSecond
     * @property {number|null} [code] RpcResponse code
     * @property {string|null} [message] RpcResponse message
     */

    /**
     * Constructs a new RpcResponse.
     * @exports RpcResponse
     * @classdesc Represents a RpcResponse.
     * @implements IRpcResponse
     * @constructor
     * @param {IRpcResponse=} [properties] Properties to set
     */
    function RpcResponse(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RpcResponse reqId.
     * @member {string} reqId
     * @memberof RpcResponse
     * @instance
     */
    RpcResponse.prototype.reqId = "";

    /**
     * RpcResponse method.
     * @member {string} method
     * @memberof RpcResponse
     * @instance
     */
    RpcResponse.prototype.method = "";

    /**
     * RpcResponse traceId.
     * @member {string} traceId
     * @memberof RpcResponse
     * @instance
     */
    RpcResponse.prototype.traceId = "";

    /**
     * RpcResponse payloadBytes.
     * @member {Uint8Array} payloadBytes
     * @memberof RpcResponse
     * @instance
     */
    RpcResponse.prototype.payloadBytes = $util.newBuffer([]);

    /**
     * RpcResponse payloadString.
     * @member {string} payloadString
     * @memberof RpcResponse
     * @instance
     */
    RpcResponse.prototype.payloadString = "";

    /**
     * RpcResponse sendTimeSecond.
     * @member {number} sendTimeSecond
     * @memberof RpcResponse
     * @instance
     */
    RpcResponse.prototype.sendTimeSecond = 0;

    /**
     * RpcResponse code.
     * @member {number} code
     * @memberof RpcResponse
     * @instance
     */
    RpcResponse.prototype.code = 0;

    /**
     * RpcResponse message.
     * @member {string} message
     * @memberof RpcResponse
     * @instance
     */
    RpcResponse.prototype.message = "";

    /**
     * Creates a new RpcResponse instance using the specified properties.
     * @function create
     * @memberof RpcResponse
     * @static
     * @param {IRpcResponse=} [properties] Properties to set
     * @returns {RpcResponse} RpcResponse instance
     */
    RpcResponse.create = function create(properties) {
        return new RpcResponse(properties);
    };

    /**
     * Encodes the specified RpcResponse message. Does not implicitly {@link RpcResponse.verify|verify} messages.
     * @function encode
     * @memberof RpcResponse
     * @static
     * @param {IRpcResponse} message RpcResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RpcResponse.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.reqId != null && Object.hasOwnProperty.call(message, "reqId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.reqId);
        if (message.method != null && Object.hasOwnProperty.call(message, "method"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.method);
        if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.traceId);
        if (message.payloadBytes != null && Object.hasOwnProperty.call(message, "payloadBytes"))
            writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.payloadBytes);
        if (message.payloadString != null && Object.hasOwnProperty.call(message, "payloadString"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.payloadString);
        if (message.sendTimeSecond != null && Object.hasOwnProperty.call(message, "sendTimeSecond"))
            writer.uint32(/* id 6, wireType 0 =*/48).int32(message.sendTimeSecond);
        if (message.code != null && Object.hasOwnProperty.call(message, "code"))
            writer.uint32(/* id 7, wireType 0 =*/56).int32(message.code);
        if (message.message != null && Object.hasOwnProperty.call(message, "message"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.message);
        return writer;
    };

    /**
     * Encodes the specified RpcResponse message, length delimited. Does not implicitly {@link RpcResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RpcResponse
     * @static
     * @param {IRpcResponse} message RpcResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RpcResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RpcResponse message from the specified reader or buffer.
     * @function decode
     * @memberof RpcResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RpcResponse} RpcResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RpcResponse.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RpcResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.reqId = reader.string();
                break;
            case 2:
                message.method = reader.string();
                break;
            case 3:
                message.traceId = reader.string();
                break;
            case 4:
                message.payloadBytes = reader.bytes();
                break;
            case 5:
                message.payloadString = reader.string();
                break;
            case 6:
                message.sendTimeSecond = reader.int32();
                break;
            case 7:
                message.code = reader.int32();
                break;
            case 8:
                message.message = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RpcResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RpcResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RpcResponse} RpcResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RpcResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RpcResponse message.
     * @function verify
     * @memberof RpcResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RpcResponse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.reqId != null && message.hasOwnProperty("reqId"))
            if (!$util.isString(message.reqId))
                return "reqId: string expected";
        if (message.method != null && message.hasOwnProperty("method"))
            if (!$util.isString(message.method))
                return "method: string expected";
        if (message.traceId != null && message.hasOwnProperty("traceId"))
            if (!$util.isString(message.traceId))
                return "traceId: string expected";
        if (message.payloadBytes != null && message.hasOwnProperty("payloadBytes"))
            if (!(message.payloadBytes && typeof message.payloadBytes.length === "number" || $util.isString(message.payloadBytes)))
                return "payloadBytes: buffer expected";
        if (message.payloadString != null && message.hasOwnProperty("payloadString"))
            if (!$util.isString(message.payloadString))
                return "payloadString: string expected";
        if (message.sendTimeSecond != null && message.hasOwnProperty("sendTimeSecond"))
            if (!$util.isInteger(message.sendTimeSecond))
                return "sendTimeSecond: integer expected";
        if (message.code != null && message.hasOwnProperty("code"))
            if (!$util.isInteger(message.code))
                return "code: integer expected";
        if (message.message != null && message.hasOwnProperty("message"))
            if (!$util.isString(message.message))
                return "message: string expected";
        return null;
    };

    /**
     * Creates a RpcResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RpcResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RpcResponse} RpcResponse
     */
    RpcResponse.fromObject = function fromObject(object) {
        if (object instanceof $root.RpcResponse)
            return object;
        var message = new $root.RpcResponse();
        if (object.reqId != null)
            message.reqId = String(object.reqId);
        if (object.method != null)
            message.method = String(object.method);
        if (object.traceId != null)
            message.traceId = String(object.traceId);
        if (object.payloadBytes != null)
            if (typeof object.payloadBytes === "string")
                $util.base64.decode(object.payloadBytes, message.payloadBytes = $util.newBuffer($util.base64.length(object.payloadBytes)), 0);
            else if (object.payloadBytes.length)
                message.payloadBytes = object.payloadBytes;
        if (object.payloadString != null)
            message.payloadString = String(object.payloadString);
        if (object.sendTimeSecond != null)
            message.sendTimeSecond = object.sendTimeSecond | 0;
        if (object.code != null)
            message.code = object.code | 0;
        if (object.message != null)
            message.message = String(object.message);
        return message;
    };

    /**
     * Creates a plain object from a RpcResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RpcResponse
     * @static
     * @param {RpcResponse} message RpcResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RpcResponse.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.reqId = "";
            object.method = "";
            object.traceId = "";
            if (options.bytes === String)
                object.payloadBytes = "";
            else {
                object.payloadBytes = [];
                if (options.bytes !== Array)
                    object.payloadBytes = $util.newBuffer(object.payloadBytes);
            }
            object.payloadString = "";
            object.sendTimeSecond = 0;
            object.code = 0;
            object.message = "";
        }
        if (message.reqId != null && message.hasOwnProperty("reqId"))
            object.reqId = message.reqId;
        if (message.method != null && message.hasOwnProperty("method"))
            object.method = message.method;
        if (message.traceId != null && message.hasOwnProperty("traceId"))
            object.traceId = message.traceId;
        if (message.payloadBytes != null && message.hasOwnProperty("payloadBytes"))
            object.payloadBytes = options.bytes === String ? $util.base64.encode(message.payloadBytes, 0, message.payloadBytes.length) : options.bytes === Array ? Array.prototype.slice.call(message.payloadBytes) : message.payloadBytes;
        if (message.payloadString != null && message.hasOwnProperty("payloadString"))
            object.payloadString = message.payloadString;
        if (message.sendTimeSecond != null && message.hasOwnProperty("sendTimeSecond"))
            object.sendTimeSecond = message.sendTimeSecond;
        if (message.code != null && message.hasOwnProperty("code"))
            object.code = message.code;
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = message.message;
        return object;
    };

    /**
     * Converts this RpcResponse to JSON.
     * @function toJSON
     * @memberof RpcResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RpcResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RpcResponse;
})();

module.exports = $root;
