import { DateTime } from 'luxon';

import { toIsoString, ISO_DATETIME_PATTERN, fromIsoString } from '../src/DateTimeUtil';

describe("DateTimeUtil", () => {

    it("produces date with valid pattern", () => {
        const dateTime = DateTime.now();
        const isoString = toIsoString(dateTime);
        expect(isoString).toMatch(ISO_DATETIME_PATTERN);
    });
    
    it("has ISO_DATETIME_PATTERN which matches valid date", () => {
        const validDateTime = "2021-06-01T12:13:34.678";
        expect(validDateTime).toMatch(ISO_DATETIME_PATTERN);
    });
    
    it("produces valid DateTime from ISO string without Z", () => {
        const dateTime = fromIsoString("2021-07-27T11:34:00.000");
        expect(dateTime.isValid).toBe(true);
    });
    
    it("produces valid DateTime from ISO string with Z", () => {
        const dateTime = fromIsoString("2021-07-27T11:34:00.000Z");
        expect(dateTime.isValid).toBe(true);
    });
});
