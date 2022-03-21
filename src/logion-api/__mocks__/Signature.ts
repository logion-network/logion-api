import {
    signAndSend,
    unsubscribe,
    replaceUnsubscriber,
    sign,
    isSuccessful,
} from './SignatureMock';

export {
    signAndSend,
    unsubscribe,
    replaceUnsubscriber,
    sign,
    isSuccessful,
};

import {
    SignedTransaction as RealSignedTransaction
} from '../../../src/logion-api/Signature';
export type SignedTransaction = RealSignedTransaction;
