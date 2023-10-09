import { v4, parse } from 'uuid';
import { UUID } from "../src/UUID.js";

describe("UUID", () => {
    const uuidString = v4();
    const uuidBytes = parse(uuidString);

    it("can be created from valid string", () => {
        const uuid = new UUID(uuidString);
        expect(uuid.toString()).toBe(uuidString);
    });

    it("can be created from bytes", () => {
        const uuid = new UUID(uuidBytes);
        expect(uuid.toString()).toBe(uuidString);
    });

    it("can be created from undefined", () => {
        const uuid = new UUID();
        expect(uuid.toString()).toBeDefined();
    });

    it("produces expected hex string", () => {
        const uuid = new UUID('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b');
        expect(uuid.toHexString()).toBe("0x6ec0bd7f11c043da975e2a8ad9ebae0b");
    });

    it("produces expected decimal string", () => {
        const uuid = new UUID('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b');
        expect(uuid.toDecimalString()).toBe("147215843976064841756558269764787219979");
    });

    it("fromDecimalString produces expected UUID from decimal string", () => {
        const uuid = UUID.fromDecimalString("147215843976064841756558269764787219979");
        expect(uuid).toBeDefined();
        expect(uuid!.toString()).toBe("6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b");
    });

    it("fromAnyString produces expected UUID from hex string", () => {
        const uuid = UUID.fromAnyString("6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b");
        expect(uuid).toBeDefined();
        expect(uuid!.toString()).toBe("6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b");
    });

    it("fromDecimalString produces expected UUID from hex string", () => {
        const uuid = UUID.fromDecimalString("something-wrong");
        expect(uuid).toBeUndefined();
    });

    it("fromDecimalStringOrThrow accepts UUID producing a number with less than 16 bytes", () => {
        const uuidString = "00c361e1-f029-4d82-9592-91946345ce7d";
        const uuidObject = new UUID(uuidString);
        const decimalUuid = "1014483181808745655871291974752783997";
        expect(uuidObject.toDecimalString()).toBe(decimalUuid);
        UUID.fromDecimalStringOrThrow(decimalUuid);
    });

    it("implements equality", () => {
        const uuid1 = new UUID('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b');
        const uuid2 = new UUID('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b');
        expect(uuid1.equalTo(uuid2)).toBe(true);
    });

    it("implements difference", () => {
        const uuid1 = new UUID('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b');
        const uuid2 = new UUID('58f7e9d6-7feb-450d-8ce5-ab1a126a293c');
        expect(uuid1.equalTo(uuid2)).toBe(false);
    });
});
