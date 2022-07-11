# Logion Client SDK

This project provides a JS/TypeScript SDK enabling an application to interact with a logion network.

## Installation

Use your favorite package manager (e.g. yarn) and install package `@logion/client` in your JavaScript/TypeScript project.

## Usage

### Authentication

```typescript
import { LogionClient, KeyringSigner } from '@logion/client';
import { Keyring } from '@polkadot/api';

const keyring = new Keyring();
keyring.addFromUri("0xe5be9a5092b81bca64be81d212e7f2f9eba183bb7a90954f7b76361f6edb5c0a"); // Alice
const signer = new KeyringSigner(keyring);

const client = await LogionClient.create({
    rpcEndpoints: [ 'wss://rpc01.logion.network' ], // A list of websocket endpoints
    directoryEndpoint: 'https://directory.logion.network' // A logion directory
});

// Authenticate Alice
const authenticatedClient = await client.authenticate([ "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY" ], signer);

// Use authenticatedClient to interact with the network
```

### Balance and Transactions

```typescript
// Balance
let balanceState = await authenticatedClient.balanceState();
const balance = balanceState.balances[0];
console.log("Balance :%s", `${balance.balance.coefficient.toInteger()}.${balance.balance.coefficient.toFixedPrecisionDecimals(2)}${balance.balance.prefix.symbol}`)

// Transactions
const transactions = balanceState.transactions;
console.log("First transaction destination: %s", transactions[0].destination)

// Transfer
balanceState =  balanceState.transfer({
    signer,
    amount: new PrefixedNumber("2", KILO),
    destination: ALICE.address
});
```

### Protection

```typescript
// Choose legal officers
const legalOfficers: LegalOfficer[] = authenticatedClient.getLegalOfficers();

const alice = legalOfficers[0];
const bob = legalOfficers[1];

// Request a protection
const noProtection = await authenticatedClient.protectionState() as NoProtection;
const pending = await noProtection.requestProtection({
    legalOfficer1: alice,
    legalOfficer2: bob,
    userIdentity: {
        email: "john.doe@invalid.domain",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "+1234",
    },
    postalAddress: {
        city: "",
        country: "",
        line1: "",
        line2: "",
        postalCode: "",
    }
});

// ... Wait for LO's acceptance ...
const accepted = (await pending.refresh()) as AcceptedProtection;

// Activate the protection
accepted.activate(signer);
```

### Vault
Operations require an activated protection (see above "Protection")
```typescript
let activeProtection = (await authenticatedClient.protectionState()) as ActiveProtection;

// Transfer from vault
let vaultState = await activeProtection.vaultState();
const vaultAddress = vaultState.vaultAddress;
vaultState = await vaultState.createVaultTransferRequest({
    legalOfficer: alice,
    amount: new PrefixedNumber("1", NONE),
    destination: REQUESTER_ADDRESS,
    signer
});
const pendingRequest = vaultState.pendingVaultTransferRequests[0];

// ... Wait for LO's acceptance ...
vaultState = await vaultState.refresh();

// Check Vault balance
const balance = vaultState.balances[0];
console.log("Balance :%s", `${balance.balance.coefficient.toInteger()}.${balance.balance.coefficient.toFixedPrecisionDecimals(2)}${balance.balance.prefix.symbol}`)
```

### Recovery

```typescript
const NEW_ADDRESS = "5GsxAu1XexDATCbDJbWxKSow4gdC6epkajZr7Ht8Ci9VZabV";

const authenticatedClient = await LogionClient.create({
    rpcEndpoints: [ 'wss://rpc01.logion.network' ], // A list of websocket endpoints
    directoryEndpoint: 'https://directory.logion.network' // A logion directory
}).authenticate([ NEW_ADDRESS ], signer);

// Request a recovery
const noProtection = await authenticatedClient.protectionState() as NoProtection;
const pending = await noProtection.requestRecovery({
    recoveredAddress: REQUESTER_ADDRESS,
    signer,
    legalOfficer1: alice,
    legalOfficer2: bob,
    userIdentity: {
        email: "john.doe@invalid.domain",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "+1234",
    },
    postalAddress: {
        city: "",
        country: "",
        line1: "",
        line2: "",
        postalCode: "",
    }
});

// ... Wait for LO's acceptance and vouching ...
const accepted = (await pending.refresh()) as AcceptedProtection;

// Activate the new protection
let pendingRecovery = await accepted.activate(signer) as PendingRecovery;
pendingRecovery = await pendingRecovery.waitForFullyReady();

// Claim 
const claimed = await pendingRecovery.claimRecovery(signer);

// Recover the lost balance
const recoveredBalance = await claimed.recoveredBalanceState();
await recoveredBalance.transfer({
    signer,
    destination: NEW_ADDRESS,
    amount: recoveredBalance.balances[0].available,
});

// Recover the lost vault
const newVault = await claimed.vaultState();
let recoveredVault = await claimed.recoveredVaultState();
recoveredVault = await recoveredVault.createVaultTransferRequest({
    legalOfficer: alice,
    amount: recoveredVault.balances[0].available,
    destination: newVault.vaultAddress,
    signer,
});

// ... Wait for LO's acceptance ...
newVault = await newVault.refresh();

// Check Vault balance
const newBalance = newVault.balances[0];
console.log("Balance :%s", `${newBalance.balance.coefficient.toInteger()}.${newBalance.balance.coefficient.toFixedPrecisionDecimals(2)}${newBalance.balance.prefix.symbol}`);
```

### Transaction Legal Officer Case (LOC)

```typescript
let locsState = await authenticatedClient.locsState();

// Request a Transaction LOC
const pendingRequest = await locsState.requestTransactionLoc({
    legalOfficer: alice,
    description: "This is a Transaction LOC",
    // Below field is required only if the legal officer you are sending the request to
    // does not already protect you (see Protection or Recovery).
    userIdentity: {
        email: "john.doe@invalid.domain",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "+1234",
    },
});

// ... Wait for LO's acceptance ...
let openLoc = await pendingRequest.refresh() as OpenLoc;

// Submit new elements to the LO through the LOC
openLoc = await openLoc.addMetadata({
    name: "Some name",
    value: "Some value"
});
const file: File = /* Some uploaded file */;
openLoc = (await openLoc.addFile({
    fileName: "id.jpeg",
    nature: "ID",
    file,
})).state;

// ... Wait for the LO to publish elements and close the LOC ...
const closedLoc = await openLoc.refresh() as ClosedLoc;
```

### Collection LOC and items

```typescript
let locsState = await authenticatedClient.locsState();

// Request a collection LOC
const pendingRequest = await locsState.requestCollectionLoc({
    legalOfficer: alice,
    description: "This is a Collection LOC",
    userIdentity: {
        email: "john.doe@invalid.domain",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "+1234",
    },
});

// ... Wait for the LO to open the LOC with upload support, fill-it in then close it ...

let closedLoc = await openLoc.refresh() as ClosedCollectionLoc;

// Add an item to the collection LOC
const itemId = "0xc53447c3d4e9d94d6f4ab926378c5b14bd66e28af619d4dcb066c862f8aeb455"; // SHA256 hash of "first-collection-item" (without the quotes)
const itemDescription = "First collection item";
const itemFileContent = "test";
const itemFileHash = hash(itemFileContent);
closedLoc = await closedLoc.addCollectionItem({
    itemId,
    itemDescription,
    signer,
    itemFiles: [ // Must remain undefined with Collection LOCs without upload support
        {
            name: "test.txt",
            contentType: "text/plain",
            hash: itemFileHash,
            size: BigInt(itemFileContent.length),
            content: Buffer.from(itemFileContent)
        }
    ]
});

// Later, retrieve the item given its ID
const item = await closedLoc.getCollectionItem({ itemId });
```

## Publication
In order to publish to [npm](https://www.npmjs.com/org/logion), you can use the following scripts:

* `yarn check-publish` - to check the published package content.
* `yarn do-publish` - to actually publish (require authentication with `npm adduser`) 
