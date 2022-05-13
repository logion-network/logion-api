import { hashAttributes } from '../src/Signer';

describe("Signer", () => {

    it("hashes single string", () => {
        const result = hashAttributes(["abcd"]);
        expect(result).toBe("iNQmb9TmM40TuEX88olXnSCciXgjuSF9o+Fhk28DFYk=");
    });

    it("hashes single float", () => {
        const result = hashAttributes([1.2]);
        expect(result).toBe("d6wxm/4ZeeLXmdnmmH5l/rVPYVEcA1UuuumQgmwghZA=");
    });

    it("hashes single integer", () => {
        const result = hashAttributes([456]);
        expect(result).toBe("s6jg4fmrG/46NvIx9nb3i7MKUZ0rIebFMMDu6Ou0pdA=");
    });

    it("hashes any elements", () => {
        const result = hashAttributes(["ABC", 123, true]);
        expect(result).toBe("L1IAt8dg2CXiUjCoVZ3wf4uIJWocNgsmhmswXmH0oAU=");
    });
});
