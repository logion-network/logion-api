import { ClosedIdentityLoc, CreateSecretRecoveryRequest, Secret } from "@logion/client";
import { State } from "./Utils";
import { UUID, ValidAccountId } from "@logion/node-api";

const secretToKeep: Secret = { name: "Key1", value: "Value1" };
const secretToRemove: Secret = { name: "Key2", value: "Value2" };
const secretToKeep2: Secret = { name: "Key3", value: "Value3" };

export async function recoverableSecrets(state: State) {

    const requesterIdentityLoc = await chooseOneIdentityLoc(state);

    await addSecrets(requesterIdentityLoc);

    await createRecoveryRequest(state, requesterIdentityLoc.locId, secretToKeep.name);
    const requestId = await createRecoveryRequest(state, requesterIdentityLoc.locId, secretToKeep2.name);

    await legalOfficerReject(state, requesterIdentityLoc.owner.account);
    await legalOfficerAccept(state, requesterIdentityLoc.owner.account);

    await downloadSecret(state, requestId, requesterIdentityLoc.locId);
}

async function chooseOneIdentityLoc(state: State): Promise<ClosedIdentityLoc> {
    const { requesterAccount } = state;
    const client = state.client.withCurrentAccount(requesterAccount);
    let locsState = await client.locsState();
    return locsState.closedLocs.Identity[0] as ClosedIdentityLoc;
}

async function addSecrets(closedIdentityLoc: ClosedIdentityLoc): Promise<void> {

    closedIdentityLoc = await closedIdentityLoc.addSecret(secretToKeep);
    expect(closedIdentityLoc).toBeInstanceOf(ClosedIdentityLoc);
    closedIdentityLoc = await closedIdentityLoc.addSecret(secretToKeep2);
    closedIdentityLoc = await closedIdentityLoc.addSecret(secretToRemove);

    let data = closedIdentityLoc.data();
    expect(data.secrets.length).toBe(3);

    closedIdentityLoc = await closedIdentityLoc.removeSecret(secretToRemove.name);

    data = closedIdentityLoc.data();
    expect(data.secrets.length).toBe(2);
    expect(data.secrets).toContain(secretToKeep);
    expect(data.secrets).toContain(secretToKeep2);
}

async function createRecoveryRequest(state: State, requesterIdentityLocId: UUID, secretName: string): Promise<string> {
    const request: CreateSecretRecoveryRequest = {
        requesterIdentityLocId,
        secretName,
        challenge: CHALLENGE,
        userIdentity: {
            email: "john.doe@invalid.domain",
            firstName: "John",
            lastName: "Doe",
            phoneNumber: "+1234",
        },
        userPostalAddress: {
            line1: "Line1",
            line2: "Line2",
            postalCode: "PostalCode",
            city: "City",
            country: "Country",
        }
    }
    return state.client.secretRecovery.createSecretRecoveryRequest(request);
}

const CHALLENGE = "my-personal-challenge";

async function legalOfficerReject(state: State, legalOfficer: ValidAccountId) {
    const recoveryReview = state.client.withCurrentAccount(legalOfficer).recoveryReview;
    let recoveryRequests = await recoveryReview.fetchRecoveryRequests();
    const toReview = recoveryRequests.pendingRequests[0];
    await toReview.reject({ rejectReason: "This is not valid" });
    recoveryRequests = await recoveryReview.fetchRecoveryRequests();
    expect(recoveryRequests.pendingRequests.length).toBe(1);
    expect(recoveryRequests.reviewedRequests.length).toBe(1);

    const rejected = recoveryRequests.reviewedRequests.find(request => request.data.id === toReview.data.id);
    expect(rejected?.data.status).toEqual("REJECTED");
}

async function legalOfficerAccept(state: State, legalOfficer: ValidAccountId) {
    const recoveryReview = state.client.withCurrentAccount(legalOfficer).recoveryReview;
    let recoveryRequests = await recoveryReview.fetchRecoveryRequests();
    const toReview = recoveryRequests.pendingRequests[0];
    await toReview.accept();
    recoveryRequests = await recoveryReview.fetchRecoveryRequests();
    expect(recoveryRequests.pendingRequests.length).toBe(0);
    expect(recoveryRequests.reviewedRequests.length).toBe(2);

    const accepted = recoveryRequests.reviewedRequests.find(request => request.data.id === toReview.data.id);
    expect(accepted?.data.status).toEqual("ACCEPTED");

}

async function downloadSecret(state: State, requestId: string, locId: UUID) {
    const secretValue = await state.client.secretRecovery.downloadSecret({
        requestId,
        requesterIdentityLocId: locId,
        challenge: CHALLENGE,
    });
    expect(secretValue).toBe(secretToKeep2.value);
}
