import { Registry } from '@polkadot/types-codec/types';
import { DispatchError } from '@polkadot/types/interfaces/system/types';

export interface ErrorMetadata {
    readonly pallet: string;
    readonly error: string;
    readonly details: string;
}

export function buildErrorMetadata(registry: Registry, dispatchError: DispatchError): ErrorMetadata {
    if (dispatchError && typeof dispatchError === 'object' && 'isModule' in dispatchError && dispatchError.isModule) {
        const module = dispatchError.asModule;
        try {
            const metaError = registry.findMetaError({
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

export function buildErrorMessage(registry: Registry, dispatchError: DispatchError): string {
    const metadata = buildErrorMetadata(registry, dispatchError);
    return `Got error ${metadata.error} from pallet ${metadata.pallet}: ${metadata.details}`;
}
