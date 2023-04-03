import { ISubmittableResult } from "@polkadot/types/types";
import { CallBase, AnyTuple, AnyJson } from "@polkadot/types-codec/types";
import { FunctionMetadataLatest } from "@polkadot/types/interfaces";
import { DispatchError } from '@polkadot/types/interfaces/system/types';
import { TypesJsonObject, TypesJsonCall, TypesEvent, TypesErrorMetadata } from "./Types.js";
import { Adapters } from "./Adapters.js";

/**
 * @deprecated use TypesJsonObject
 */
export interface JsonObject extends TypesJsonObject {} // eslint-disable-line @typescript-eslint/no-empty-interface
/**
 * @deprecated use TypesJsonCall
 */
export interface JsonCall extends TypesJsonCall {} // eslint-disable-line @typescript-eslint/no-empty-interface

/**
 * @deprecated use Adapters.toJsonCall(genericCall)
 */
export function toJsonCall(genericCall: CallBase<AnyTuple, FunctionMetadataLatest>): JsonCall {
    return Adapters.toJsonCall(genericCall);
}

/**
 * @deprecated use Adapters.isJsonObject(anyJson)
 */
export function isJsonObject(anyJson: AnyJson): anyJson is JsonObject {
    return Adapters.isJsonObject(anyJson);
}

/**
 * @deprecated use Adapters.isJsonObject(anyJson)
 */
export function asJsonObject(anyJson: AnyJson): JsonObject {
    return Adapters.asJsonObject(anyJson);
}

/**
 * @deprecated use Adapters.isString(anyJson)
 */
export function isString(anyJson: AnyJson): anyJson is string {
    return Adapters.isString(anyJson);
}

/**
 * @deprecated use Adapters.asString(anyJson)
 */
export function asString(anyJson: AnyJson): string {
    return Adapters.asString(anyJson);
}

/**
 * @deprecated use Adapters.isArray(anyJson)
 */
export function isArray(anyJson: AnyJson): anyJson is AnyJson[] {
    return Adapters.isArray(anyJson);
}

/**
 * @deprecated use Adapters.asArray(anyJson)
 */
export function asArray(anyJson: AnyJson): AnyJson[] {
    return Adapters.asArray(anyJson);
}

/**
 * @deprecated use Adapters.isHexString(anyJson)
 */
export function isHexString(anyJson: AnyJson): anyJson is string {
    return Adapters.isHexString(anyJson);
}

/**
 * @deprecated use Adapters.asHexString(anyJson)
 */
export function asHexString(anyJson: AnyJson): string {
    return Adapters.asHexString(anyJson);
}

/**
 * @deprecated use Adapters.isNumberString(anyJson)
 */
export function isNumberString(anyJson: AnyJson): anyJson is string {
    return Adapters.isNumberString(anyJson);
}

/**
 * @deprecated use Adapters.asBigInt(anyJson)
 */
export function asBigInt(anyJson: AnyJson): bigint {
    return Adapters.asBigInt(anyJson);
}

/**
 * @deprecated use Adapters.isJsonCall(anyJson)
 */
export function isJsonCall(anyJson: AnyJson): anyJson is JsonCall {
    return Adapters.isJsonCall(anyJson);
}

/**
 * @deprecated use Adapters.asJsonCall(anyJson)
 */
export function asJsonCall(anyJson: AnyJson): JsonCall {
    return Adapters.asJsonCall(anyJson);
}

/**
 * @deprecated use TypesEvent
 */
export interface Event extends TypesEvent {} // eslint-disable-line @typescript-eslint/no-empty-interface

/**
 * @deprecated use Adapters.getExtrinsicEvents(result)
 */
export function getExtrinsicEvents(result: ISubmittableResult): Event[] {
    return Adapters.getExtrinsicEvents(result);
}

/**
 * @deprecated use TypesErrorMetadata
 */
export interface ErrorMetadata extends TypesErrorMetadata {} // eslint-disable-line @typescript-eslint/no-empty-interface

/**
 * @deprecated use Adapters.getErrorMetadata(dispatchError)
 */
export function getErrorMetadata(dispatchError: DispatchError): ErrorMetadata {
    return Adapters.getErrorMetadata(dispatchError);
}

/**
 * @deprecated use Adapters.getErrorMessage(dispatchError)
 */
export function getErrorMessage(dispatchError: DispatchError): string {
    return Adapters.getErrorMessage(dispatchError);
}
