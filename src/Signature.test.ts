jest.mock('@polkadot/extension-dapp');
jest.mock('@polkadot/api');
jest.mock('./Codec');

import {
    createHash,
    SignAndSendCallback,
    ErrorCallback,
    ExtrinsicSignatureParameters,
    signAndSend,
    Unsubscriber,
    replaceUnsubscriber,
    AttributesSignatureParameters,
    sign,
    isSuccessful
} from './Signature';
import { mockSubmittableResult } from './__mocks__/SignatureMock';
import { mockSubmittable, mockSigner } from './__mocks__/PolkadotApiMock';
import { setSigner } from './__mocks__/PolkadotExtensionDappMock';
import moment from 'moment';
import PeerId from 'peer-id';
import crypto from 'libp2p-crypto';
import * as ed from '@noble/ed25519';
import { toHex } from './Codec';

describe("Signature", () => {

    test("Injected account signs and sends successfully", async () => {
        const callback: SignAndSendCallback = () => {};
        const errorCallback: ErrorCallback = () => {};
        const submittable = mockSubmittable();
        const parameters: ExtrinsicSignatureParameters = {
            signerId: "lockedSigner",
            submittable,
            callback,
            errorCallback
        };
        const unsubscriber = await signAndSend(parameters);
        expect(unsubscriber).toBe(submittable.unsubscriber);
        expect(submittable.signatureType).toBe('INJECTED');
    });

    test("Setting new unsubscriber", async () => {
        const currentUnsubscriber: Unsubscriber | null = null;
        let newUnsubscriber: Unsubscriber | null = Promise.resolve(() => {});
        let setValue: Unsubscriber | null = null;
        const setUnsubscriber = (value: Unsubscriber | null) => {setValue = value};
        await replaceUnsubscriber(currentUnsubscriber, setUnsubscriber, newUnsubscriber);
        expect(setValue).toBe(newUnsubscriber);
    });

    test("Replacing existing unsubscriber", async () => {
        let currentUnsubscriberCalled: boolean = false;
        const currentUnsubscriber: Unsubscriber | null = Promise.resolve(() => {currentUnsubscriberCalled = true});
        let newUnsubscriber: Unsubscriber | null = Promise.resolve(() => {});
        let setValue: Unsubscriber | null = null;
        const setUnsubscriber = (value: Unsubscriber | null) => {setValue = value};
        await replaceUnsubscriber(currentUnsubscriber, setUnsubscriber, newUnsubscriber);
        expect(currentUnsubscriberCalled).toBe(true);
        expect(setValue).toBe(newUnsubscriber);
    });

    test("String signature", async () => {
        const signerId = "signerId";
        const attributes: any[] = ["message", 132, true];
        const expectedSignature: string = "signature";
        const resource = "resource";
        const operation = "op";
        const signedOnString = '2021-06-01T08:24:30.573';
        const signedOn = moment(signedOnString + 'Z');
        const allAttributes = [resource, operation, signedOnString].concat(attributes);
        const expectedData = createHash(allAttributes);
        const signer = mockSigner(async (parameters: any): Promise<any> => {
            if(parameters.address === signerId
                    && parameters.type === "bytes"
                    && parameters.data === expectedData) {
                return {
                    id: "request ID",
                    signature: expectedSignature,
                };
            } else {
                const parametersJson = JSON.stringify(parameters);
                const expectedJson = JSON.stringify({
                    address: signerId,
                    type: "bytes",
                    data: expectedData
                });
                throw new Error(`expected ${expectedJson} but got ${parametersJson}`);
            }
        });
        setSigner(signerId, signer);
        const parameters: AttributesSignatureParameters = {
            resource: "resource",
            operation: "op",
            signedOn,
            signerId,
            attributes
        };
        const result = await sign(parameters);
        expect(result).toBe(expectedSignature);
    });

    test.each(
        [
            ["iNQmb9TmM40TuEX88olXnSCciXgjuSF9o+Fhk28DFYk=", ["abcd"]],
            ["d6wxm/4ZeeLXmdnmmH5l/rVPYVEcA1UuuumQgmwghZA=", [1.2]],
            ["s6jg4fmrG/46NvIx9nb3i7MKUZ0rIebFMMDu6Ou0pdA=", [456]],
            ["L1IAt8dg2CXiUjCoVZ3wf4uIJWocNgsmhmswXmH0oAU=", ["ABC", 123, true]],
        ])(
        'createHash() %p is the hash of %p',
        (expectedMessage, attributes) => {
            const result = createHash(attributes);
            expect(result).toBe(expectedMessage);
        }
    );

    test("isSuccessful with null", () => {
        const result = isSuccessful(null);
        expect(result).toBe(false);
    });

    test("isSuccessful if not inBlock", () => {
        const result = isSuccessful(mockSubmittableResult(false));
        expect(result).toBe(false);
    });

    test("isSuccessful if inBlock and success", () => {
        const result = isSuccessful(mockSubmittableResult(true, "InBlock", false));
        expect(result).toBe(true);
    });

    test("isSuccessful if inBlock and error", () => {
        const result = isSuccessful(mockSubmittableResult(true, "InBlock", true));
        expect(result).toBe(false);
    });

    test("Test libp2p", async () => {
        const peerId = PeerId.createFromB58String("12D3KooWDCuGU7WY3VaWjBS1E44x4EnmTgK3HRxWFqYG3dqXDfP1");
        const nodeKey = "1c482e5368b84abe08e1a27d0670d303351989b3aa281cb1abfc2f48e4530b57";

        const publicKey = peerId.pubKey;
        const privateKeyBytes = Buffer.from(nodeKey, "hex");
        const privateKey = await crypto.keys.supportedKeys.ed25519.unmarshalEd25519PrivateKey(concatKeys(privateKeyBytes, publicKey.bytes));

        const message = Buffer.from("test", "utf-8");
        const signature = await privateKey.sign(message);

        expect(await publicKey.verify(message, signature)).toBe(true);
    });
});

function concatKeys(privateKeyRaw: Uint8Array, publicKey: Uint8Array) {
    const privateKey = new Uint8Array(64);
    for (let i = 0; i < 32; i++) {
        privateKey[i] = privateKeyRaw[i];
        privateKey[32 + i] = publicKey[i];
    }
    return privateKey;
}
