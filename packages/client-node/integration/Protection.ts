import { UUID, ValidAccountId } from '@logion/node-api';

import {
    ActiveProtection,
    NoProtection,
    PendingRequest,
    AcceptedRequest,
    OpenLoc,
    waitFor
} from '@logion/client';
import { initAccountBalance, State } from "./Utils.js";
import { ClosedLoc } from "@logion/client/dist/Loc";
import { LegalOfficerClass } from "@logion/client/dist/Types";

export interface IdentityLocs {
    alice: UUID,
    bob: UUID,
    charlie: UUID,
}

export async function requestValidIdentity(state: State, account: ValidAccountId): Promise<IdentityLocs> {
    const { alice, bob, charlie } = state
    const idByAlice = await createsIdentityLoc(state, account, alice);
    const idByBob = await createsIdentityLoc(state, account, bob);
    const idByCharlie = await createsIdentityLoc(state, account, charlie);
    return { alice: idByAlice.data().id, bob: idByBob.data().id, charlie: idByCharlie.data().id }
}

export async function enablesProtection(state: State, identityLocs: IdentityLocs) {
    const activate = await activateProtection(state, identityLocs);
    expect(activate).toBeInstanceOf(ActiveProtection);
}

async function activateProtection(state: State, identityLocs: IdentityLocs): Promise<ActiveProtection> {
    const { client, alice, charlie, requesterAccount, signer } = state;

    const authenticatedClient = client.withCurrentAccount(requesterAccount);

    console.log("Requesting protection")
    const current = await authenticatedClient.protectionState();
    expect(current).toBeInstanceOf(NoProtection);

    if (current instanceof NoProtection) {
        return await current.activateProtection({
            payload: {
                legalOfficer1: authenticatedClient.getLegalOfficer(alice.account),
                legalOfficer2: authenticatedClient.getLegalOfficer(charlie.account),
                requesterIdentityLoc1: identityLocs.alice,
                requesterIdentityLoc2: identityLocs.charlie,
            },
            signer,
        });
    } else {
        throw new Error("Unexpected state, aborting");
    }
}

async function createsIdentityLoc(state: State, account: ValidAccountId, legalOfficer: LegalOfficerClass): Promise<ClosedLoc> {
    const { client, signer } = state;
    console.log("Setting balance of %s", account.address)
    await initAccountBalance(state, account);

    const authenticatedClient = client.withCurrentAccount(account);
    const locsState = await authenticatedClient.locsState();

    const pendingRequest = await locsState.requestIdentityLoc({
        legalOfficerAccountId: legalOfficer.account,
        description: "Identity LOC",
        draft: false,
        userIdentity: {
            email: "john.doe@invalid.domain",
            firstName: "John",
            lastName: "Doe",
            phoneNumber: "+1234",
        },
        userPostalAddress: {
            city: "",
            country: "",
            line1: "",
            line2: "",
            postalCode: "",
        }
    });

    const identityLocId = pendingRequest.data().id;

    // LLO Accepts
    const lloClient = state.client.withCurrentAccount(legalOfficer.account);
    let lloLocs = await lloClient.locsState({ spec: { ownerAddress: legalOfficer.account.address, locTypes: ["Identity"], statuses: ["REVIEW_PENDING"] } });
    const lloPending = lloLocs.findById(identityLocId) as PendingRequest;
    const lloAccepted = await lloPending.legalOfficer.accept();

    // User Opens
    const acceptedIdentityLoc = await pendingRequest.refresh() as AcceptedRequest;
    await acceptedIdentityLoc.open({ signer, autoPublish: false });

    // LLO Closes
    let lloOpen = await lloAccepted.refresh() as OpenLoc;
    lloOpen = await waitFor<OpenLoc>({
        producer: prev => prev ? prev.refresh() as Promise<OpenLoc> : lloOpen.refresh() as Promise<OpenLoc>,
        predicate: state => state.legalOfficer.canClose(false),
    });
    return await lloOpen.legalOfficer.close({ signer, autoAck: false }) as ClosedLoc;
}
