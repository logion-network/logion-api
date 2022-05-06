import { DateTime } from "luxon";

export function toIsoString(moment: DateTime): string {
    let signedOn = moment.toISO();
    if(signedOn.endsWith('Z')) {
        return signedOn.substring(0, signedOn.length - 1);
    } else {
        return signedOn;
    }
}

export const ISO_DATETIME_PATTERN = /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}/;

export function fromIsoString(isoString: string): DateTime {
    if (isoString.endsWith('Z')) {
        return DateTime.fromISO(isoString);
    } else {
        return DateTime.fromISO(isoString + "Z");
    }
}

export function format(isoString: string): { date: string, time: string } {
    const momentObject = fromIsoString(isoString);
    const date = momentObject.toISODate();
    const time = momentObject.toISOTime();
    return { date, time }
}
