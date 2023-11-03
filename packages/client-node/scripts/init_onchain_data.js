import { buildApiClass } from "@logion/node-api";
import { Keyring } from '@polkadot/api';

let api;
let keyring;
let alice;
let bob;
let charlie;

buildApiClass("ws://localhost:9944")
.then(api0 => {
    api = api0.polkadot;
    keyring = new Keyring({ type: 'sr25519' });
    alice = keyring.addFromUri("0xe5be9a5092b81bca64be81d212e7f2f9eba183bb7a90954f7b76361f6edb5c0a");
    bob = keyring.addFromUri("0x398f0c28f98885e046333d4a41c19cee4c37368a9832c6502f6cfd182e2aef89");
    charlie = keyring.addFromUri("0xbc1ede780f784bb6991a585e4f6e61522c14e1cae6ad0895fb57b9a205a8f938");

    return api.tx.loAuthorityList
        .updateLegalOfficer(alice.address, {
            Host: {
                nodeId: "0x0024080112201ce5f00ef6e89374afb625f1ae4c1546d31234e87e3c3f51a62b91dd6bfa57df",
                baseUrl: "http://localhost:8080",
                region: "Europe",
            }
        })
        .signAndSend(alice);
})
.then(hash => {
    console.log(`Alice update tx hash: ${hash}`);
    return api.tx.loAuthorityList
        .updateLegalOfficer(bob.address, {
            Host: {
                nodeId: "0x002408011220dacde7714d8551f674b8bb4b54239383c76a2b286fa436e93b2b7eb226bf4de7",
                baseUrl: "http://localhost:8081",
                region: "Europe",
            }
        })
        .signAndSend(bob);
})
.then(hash => {
    console.log(`Bob update tx hash: ${hash}`);
    return api.tx.loAuthorityList
        .updateLegalOfficer(charlie.address, {
            Host: {
                nodeId: "0x002408011220876a7b4984f98006dc8d666e28b60de307309835d775e7755cc770328cdacf2e",
                baseUrl: "http://localhost:8082",
                region: "Europe",
            }
        })
        .signAndSend(charlie);
})
.then(hash => {
    console.log(`Charlie update tx hash: ${hash}`);
    return api.disconnect();
})
.then(() => {
    console.log("Done");
});
