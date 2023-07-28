import { generateEthereumTokenItemId } from "../src/index.js";

describe("Ethereum", () => {

    it("generates expected item ID", () => {
        const itemId = generateEthereumTokenItemId(nonce, tokenId);
        expect(itemId.toHex()).toBe("0xc17b4efc90d044c63995a71bef37901e34401013a534e85c9d78522182046ff6");
    });
});

const nonce = "some-nonce";
const tokenId = "0";
