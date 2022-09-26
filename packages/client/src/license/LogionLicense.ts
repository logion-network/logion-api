import { UUID } from "@logion/node-api";
import { AbstractLicense } from "./License";
import { Iso3166Alpha2Code } from "../Country";
import { DateTime } from 'luxon';

type LogionTransferredRightCode = "A" | "B";

type LogionTransferredRight = {
    shortDescription: string
    description: string
}

export const logionLicenseItems: Record<LogionTransferredRightCode, LogionTransferredRight> = {
    A: {
        shortDescription: "RIGHT TO REPRODUCE/COPY",
        description:
            "Reproduction is the right to copy on any physical or digital medium, ex. CD,DVD, downloading or to copy " +
            "on physical merchandise."
    },
    B: {
        shortDescription: "RIGHT TO REPRESENT/TO PUBLICLY DISPLAY/TO PERFORM",
        description:
            "Representation is the right to publicly display and/or show, ex. in an exhibition, on a television, " +
            "cinema or computer screen, to perform a musical work of art."
    }
}

interface LogionLicenseParameters {
    transferredRights: LogionTransferredRightCode[],
    regionalLimit: Iso3166Alpha2Code[],
    expiration?: string
}

export class LogionLicense extends AbstractLicense<LogionLicenseParameters> {

    constructor(licenseLocId: UUID, parameters: LogionLicenseParameters) {
        LogionLicense.requireIsoDate(parameters.expiration);
        super('Logion', licenseLocId, parameters);
    }

    get transferredRights(): LogionTransferredRight[] {
        return this.parameters.transferredRights.map(code => logionLicenseItems[code])
    }

    get regionalLimit(): Iso3166Alpha2Code[] {
        return this.parameters.regionalLimit
    }

    get expiration(): string | undefined {
        return this.parameters.expiration;
    }

    get details(): string {
        return JSON.stringify(this.parameters)
    }

    static fromDetails(licenseLocId: UUID, details: string): LogionLicense {
        const parameters = JSON.parse(details);
        if (parameters.transferredRights === undefined) {
            parameters.transferredRights = [];
        }
        if (parameters.regionalLimit === undefined) {
            parameters.regionalLimit = [];
        }
        return new LogionLicense(licenseLocId, parameters);
    }

    static requireIsoDate(date: string | undefined) {
        if (date) {
            if (!DateTime.fromISO(date).isValid) {
                throw new Error("Invalid date");
            }
        }
    }
}
