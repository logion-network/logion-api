import { ISubmittableResult } from "@polkadot/types/types";
import { CallBase, AnyTuple, AnyJson } from "@polkadot/types-codec/types";
import { FunctionMetadataLatest } from "@polkadot/types/interfaces";
import { DispatchError } from '@polkadot/types/interfaces/system/types';

export interface JsonObject {
    [index: string]: AnyJson
}

export interface JsonCall extends JsonObject {
    method: string;
    section: string;
    args: JsonObject;
}

export function toJsonCall(genericCall: CallBase<AnyTuple, FunctionMetadataLatest>): JsonCall {
    const args: {[index: string]: AnyJson} = {};

    for (let i = 0; i < genericCall.args.length; ++i) {
        const arg = genericCall.args[i];
        const meta = genericCall.meta.fields[i];
        args[meta.name.unwrap().toString()] = arg.toHuman(true);
    }

    return {
        section: genericCall.section,
        method: genericCall.method,
        args,
    };
}

export function isJsonObject(anyJson: AnyJson): anyJson is JsonObject {
    return typeof anyJson === "object";
}

export function asJsonObject(anyJson: AnyJson): JsonObject {
    if(isJsonObject(anyJson)) {
        return anyJson;
    } else {
        throw new Error("Not an object");
    }
}

export function isString(anyJson: AnyJson): anyJson is string {
    return typeof anyJson === "string";
}

export function asString(anyJson: AnyJson): string {
    if(isString(anyJson)) {
        return anyJson;
    } else {
        throw new Error("Not a string");
    }
}

export function isArray(anyJson: AnyJson): anyJson is AnyJson[] {
    return anyJson instanceof Array;
}

export function asArray(anyJson: AnyJson): AnyJson[] {
    if(isArray(anyJson)) {
        return anyJson;
    } else {
        throw new Error("Not an array");
    }
}

export function isHexString(anyJson: AnyJson): anyJson is string {
    return typeof anyJson === "string" && anyJson.startsWith("0x");
}

export function asHexString(anyJson: AnyJson): string {
    if(isHexString(anyJson)) {
        return anyJson;
    } else {
        throw new Error("Not a string");
    }
}

export function isNumberString(anyJson: AnyJson): anyJson is string {
    return typeof anyJson === "string";
}

export function asBigInt(anyJson: AnyJson): bigint {
    if(isString(anyJson)) {
        return BigInt(anyJson.replaceAll(",", ""));
    } else {
        throw new Error("Not a string");
    }
}

export function isJsonCall(anyJson: AnyJson): anyJson is JsonCall {
    return isJsonObject(anyJson)
        && "section" in anyJson && isString(anyJson.section)
        && "method" in anyJson && isString(anyJson.method)
        && "args" in anyJson && isJsonObject(anyJson.args);
}

export function asJsonCall(anyJson: AnyJson): JsonCall {
    if(isJsonCall(anyJson)) {
        return anyJson;
    } else {
        throw new Error("Not a JsonCall");
    }
}

export interface Event {
    name: string;
    section: string;
    data: JsonObject | AnyJson[];
}

export function getExtrinsicEvents(result: ISubmittableResult): Event[] {
    return result.events
        .filter(record => record.phase.isApplyExtrinsic)
        .map(record => record.event.toHuman())
        .map(json => ({
            name: json.method as string,
            section: json.section as string,
            data: getEventData(json.data),
        }));
}

function getEventData(json: AnyJson): JsonObject | AnyJson[] {
    if(isArray(json)) {
        return asArray(json);
    } else {
        return asJsonObject(json);
    }
}

export interface ErrorMetadata {
    readonly pallet: string;
    readonly error: string;
    readonly details: string;
}

export function getErrorMetadata(dispatchError: DispatchError): ErrorMetadata {
    if (dispatchError && typeof dispatchError === 'object' && 'isModule' in dispatchError && dispatchError.isModule) {
        const module = dispatchError.asModule;
        try {
            const metaError = dispatchError.registry.findMetaError({
                index: module.index,
                error: module.error
            });
            if (metaError) {
                return {
                    pallet: metaError.section,
                    error: metaError.name,
                    details: metaError.docs.join(', ').trim()
                }
            } else {
                return {
                    pallet: "unknown",
                    error: "Unknown",
                    details: `index:${ module.index } error:${ module.error }`
                }
            }
        } catch (e) {
            return {
                pallet: "unknown",
                error: "Unknown",
                details: `Failed to find meta error: ${e}`
            }
        }
    }
    return {
        pallet: "unknown",
        error: "Unknown",
        details: "An unknown error occurred"
    }
}

export function getErrorMessage(dispatchError: DispatchError): string {
    const metadata = getErrorMetadata(dispatchError);
    return `Got error ${metadata.error} from pallet ${metadata.pallet}: ${metadata.details}`;
}
