import { ISubmittableResult } from '@polkadot/types/types';

import { LogionClient } from './LogionClient';
import { LegalOfficer, PostalAddress, UserIdentity } from './Types';
import { Token } from './Http';
import { AccountTokens } from './AuthenticationClient';
import { DirectoryClient } from './DirectoryClient';
import { buildMessage, FullSigner, signerCallback, SignParameters, SignRawParameters, SignCallback, isSuccessful } from './Signer';
import {
    ProtectionState,
    NoProtection,
    PendingProtection,
    AcceptedProtection,
    ActiveProtection,
    PendingRecovery,
    ClaimedRecovery,
    UnavailableProtection
} from './Recovery';

export {
    LogionClient,
    LegalOfficer,
    Token,
    AccountTokens,
    DirectoryClient,
    buildMessage,
    FullSigner,
    signerCallback,
    SignParameters,
    SignRawParameters,
    ProtectionState,
    NoProtection,
    PendingProtection,
    AcceptedProtection,
    ActiveProtection,
    PendingRecovery,
    ClaimedRecovery,
    UnavailableProtection,
    PostalAddress,
    UserIdentity,
    SignCallback,
    ISubmittableResult,
    isSuccessful,
};
