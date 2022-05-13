import { LogionClient } from "../src";
import { TEST_LOGION_CLIENT_CONFIG, buildSigner, ALICE_SECRET_SEED } from "./Utils";
import { ALICE } from "../test/Utils";
import { BalanceState } from "../src/Balance";
import { PrefixedNumber, KILO } from "@logion/node-api/dist/numbers";

describe("Balance", () => {

    const REQUESTER_ADDRESS = "5ERRWWYABvYjyUG2oLCNifkmcCQT44ijPpQNxtwZZFj86Jjd";
    const REQUESTER_SECRET_SEED = "climb grid device gesture collect green keen artefact page trick circle pull";

    it("transfers", async () => {
        const client = await LogionClient.create(TEST_LOGION_CLIENT_CONFIG);
        const signer = buildSigner([ ALICE_SECRET_SEED, REQUESTER_SECRET_SEED ]);

        let authenticatedLogionClient = await client.authenticate([ ALICE.address, REQUESTER_ADDRESS ], signer);

        // Alice transfers to user.
        const aliceClient = authenticatedLogionClient.withCurrentAddress(ALICE.address)
        let aliceState = await aliceClient.balanceState();

        checkBalance(aliceState, "100.00k");
        aliceState = await aliceState.transfer(signer, {
            amount: new PrefixedNumber("5", KILO),
            destination: REQUESTER_ADDRESS });
        checkBalance(aliceState, "94.99k");

        // User transfers to Alice.
        const userClient = authenticatedLogionClient.withCurrentAddress(REQUESTER_ADDRESS)
        let userState = await userClient.balanceState();

        checkBalance(userState, "5.00k");
        userState = await userState.transfer(signer, {
            amount: new PrefixedNumber("2", KILO),
            destination: ALICE.address });
        checkBalance(userState, "2.99k");

        // Alice checks her balance.
        aliceState = await aliceState.refresh();
        checkBalance(aliceState, "96.99k");
    })

    function checkBalance(balanceState: BalanceState, expectedValue: string) {
        const balance = balanceState.balances[0];
        const formatted = `${balance.balance.coefficient.toInteger()}.${balance.balance.coefficient.toFixedPrecisionDecimals(2)}${balance.balance.prefix.symbol}`
        expect(formatted).toEqual(expectedValue)
    }
})
