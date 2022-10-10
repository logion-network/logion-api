import { generateEthereumTokenItemId } from "../src";

describe("Ethereum", () => {

    it("generates expected item ID", () => {
        const itemId = generateEthereumTokenItemId(contractAddress, tokenId);
        expect(itemId).toBe("0xfb00f67fd24b8e3942435db71c3236ea3e272c13e42a3cbae9aa4d1d21a84466");
    });
});

const contractAddress = "0xc78D69a25DE97E155FEed1c0377fCbF51e32A83D";
const tokenId = "0";
