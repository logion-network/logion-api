import { DateTime } from "luxon";

export function toIsoString(moment: DateTime): string {
    const signedOn = moment.toISO();
    if(signedOn.endsWith('Z')) {
        return signedOn.substring(0, signedOn.length - 1);
    } else {
        return signedOn;
    }
}

export const ISO_DATETIME_PATTERN = /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}/;

export function fromIsoString(isoString: string): DateTime {
    return DateTime.fromISO(isoString, {zone: "utc"});
}
