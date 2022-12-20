import { DEFAULT_LEGAL_OFFICER } from "./TestData";
import { ApiPromise } from '@polkadot/api';
import { setQueryRecoveryRecoverable, setQueryRecoveryActiveRecoveries } from './__mocks__/PolkadotApiMock';
import { createRecovery, getRecoveryConfig, initiateRecovery, getActiveRecovery } from '../src';

jest.mock('@polkadot/api');

test("recovery creation", () => {
    const api = new ApiPromise();
    const legalOfficers = ["1", "2"];

    createRecovery({
        api,
        legalOfficers,
    });

    expect(api.tx.verifiedRecovery.createRecovery).toHaveBeenCalledWith(legalOfficers);
});

test("get recovery config", async () => {
    const accountId = "account";
    const recoveryConfig = {
        isEmpty: false,
        isNone: false,
        unwrap: () => ({
            friends: {
                toArray: () => [
                    { toString: () => DEFAULT_LEGAL_OFFICER }
                ]
            }
        })
    };
    const recoverable = jest.fn()
        .mockImplementation(targetAccountId => targetAccountId === accountId ? Promise.resolve(recoveryConfig) : Promise.reject());
    setQueryRecoveryRecoverable(recoverable);
    const api = new ApiPromise();
    const config = await getRecoveryConfig({
        api,
        accountId
    })
    expect(config).toBeDefined()
    expect(config!.legalOfficers).toEqual([ DEFAULT_LEGAL_OFFICER ])
});

test("initiate recovery", () => {
    const api = new ApiPromise();
    const addressToRecover = "address";
    
    initiateRecovery({
        api,
        addressToRecover
    });

    expect(api.tx.recovery.initiateRecovery).toHaveBeenCalledWith(addressToRecover);
});

test("get active recovery", async () => {
    const accountToRecover = "account1";
    const recoveringAccount = "account2";
    const activeRecovery = {
        isEmpty: false,
        isNone: false,
        unwrap: () => ({
            friends: {
                toArray: () => [
                    { toString: () => DEFAULT_LEGAL_OFFICER }
                ]
            }
        })
    };
    const recoverable = jest.fn()
        .mockImplementation((source, dest) =>
            (source === accountToRecover && dest === recoveringAccount)
                ? Promise.resolve(activeRecovery)
                : Promise.reject());
    setQueryRecoveryActiveRecoveries(recoverable);
    const api = new ApiPromise();
    const recovery = await getActiveRecovery({
        api,
        sourceAccount: accountToRecover,
        destinationAccount: recoveringAccount,
    })
    expect(recovery).toBeDefined()
    expect(recovery!.legalOfficers).toEqual([ DEFAULT_LEGAL_OFFICER ])
});
