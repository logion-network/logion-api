import { UUID } from "@logion/node-api";
import { AbstractTermsAndConditionsElement } from "./TermsAndConditions";
import { Iso3166Alpha2Code } from "../Country";
import { DateTime } from 'luxon';

export type LogionTransferredRightCode = "PER-PRIV" | "PER-PUB" | "COM-NOMOD" | "COM-MOD" | "EX" | "NOEX" | "WW" | "REG" | "NOTIME" | "TIME";

export type LogionTransferredRightDescription = {
    shortDescription: string
    description: string
}

export type LogionTransferredRight = { code: LogionTransferredRightCode } & LogionTransferredRightDescription;

export const logionLicenseItems: Record<LogionTransferredRightCode, LogionTransferredRightDescription> = {
    "PER-PRIV": {
        shortDescription: "PERSONAL, PRIVATE USE ONLY",
        description:
            "Use the Underlying Asset for your personal use, exclusively in private spheres and so long as that " +
            "personal use is non-commercial, i.e. does not, directly or indirectly, result in compensation, " +
            "financial benefit or commercial gain, To the extent that such use is non-commercial and private, you " +
            "may use, reproduce, display and as necessary perform but not modify the Underlying Asset."
    },
    "PER-PUB": {
        shortDescription: "PERSONAL, PRIVATE, AND PUBLIC USE",
        description:
            "Use the Underlying Asset for your personal use, both in private and public spheres and so long as that " +
            "personal use is non-commercial, i.e. does not, directly or indirectly, result in compensation, " +
            "financial benefit or commercial gain, Includes the right to display the Underlying Assets as a profile " +
            "picture or in the metaverse. To the extent that such use is non-commercial, you may use, reproduce, " +
            "display and as necessary perform but not modify the Underlying Asset."
    },
    "COM-NOMOD": {
        shortDescription: "COMMERCIAL USE WITHOUT MODIFICATION",
        description:
            "Use the Underlying Asset for commercial use, i.e. directly or indirectly, results in compensation, " +
            "financial benefit or commercial gain and may include promoting, marketing, advertising, and selling. " +
            "Such commercial use includes the right to use, reproduce, display, distribute and as necessary perform, " +
            "but not modify the Underlying Asset. Commercial use also confers personal, private and public use of " +
            "the Underlying Asset. Includes the right to display the Underlying Asset as a profile picture, display " +
            "on products or services using the Underlying Asset, display on sold merchandise, display in a physical " +
            "or digital museum. Includes the right to sublicense such rights."
    },
    "COM-MOD": {
        shortDescription: "COMMERCIAL USE WITH THE RIGHT TO MODIFY",
        description:
            "Use the Underlying Asset for commercial use, i.e. directly or indirectly, results in compensation, " +
            "financial benefit or commercial gain and may include promoting, marketing, advertising, and selling. " +
            "Such commercial use includes the right to use, reproduce, display, distribute and as necessary perform " +
            "and modify the Underlying Asset. Includes the right to adapt the Underlying Asset, i.e. to recast, " +
            "transform, translate or adapt, including in any form recognizably derived from the original and in so " +
            "doing create derivative works of art. Commercial use also confers personal, private and public use of " +
            "the Underlying Asset. Includes the right to display the Underlying Asset as a profile picture, display " +
            "on products or services using the Underlying Asset and/or its derivatives, display on sold merchandise, " +
            "display in a physical or digital museum. Includes the right to sublicense such rights."
    },
    "EX": {
        shortDescription: "EXCLUSIVE USE",
        description:
            "The above-mentioned rights, as applicable, are exclusive in nature, i.e. are licensed and/or assigned " +
            "to no other person or entity."
    },
    "NOEX": {
        shortDescription: "NON-EXCLUSIVE USE",
        description:
            "The above-mentioned rights, as applicable, are non-exclusive in nature, i.e. they can be licensed " +
            "and/or assigned to other persons or entities."
    },
    "WW": {
        shortDescription: "WORLDWIDE USE",
        description:
            "Covers use in all countries of the world, existing and future, not limited territorially."
    },
    "REG": {
        shortDescription: "COUNTRY-SPECIFIC OR REGIONAL USE",
        description:
            "Means that some territorial limitations apply. The list of allowed countries is recorded by the logion " +
            "infrastructure."
    },
    "NOTIME": {
        shortDescription: "FOR THE ENTIRE DURATION OF THE IP RIGHTS",
        description:
            "The duration of the IP rights contemplated - author rights and copyright - are for the entire life of " +
            "the Creator and 70 years afterward, counted from the moment the work of art has been disclosed."
    },
    "TIME": {
        shortDescription: "FOR A LIMITED PERIOD OF TIME",
        description:
            "Means that the license/assignment grant is limited in time as recorded by the logion infrastructure"
    },
}

export interface LogionLicenseParameters {
    transferredRights: LogionTransferredRightCode[],
    regionalLimit?: Iso3166Alpha2Code[],
    expiration?: string
}

export class LogionClassification extends AbstractTermsAndConditionsElement<LogionLicenseParameters> {

    constructor(licenseLocId: UUID, parameters: LogionLicenseParameters) {
        LogionClassification.requireIsoDate(parameters.expiration);
        super('logion_classification', licenseLocId, parameters);
    }

    get transferredRights(): LogionTransferredRight[] {
        return this.parameters.transferredRights.map(code => ({ ...logionLicenseItems[code], code }))
    }

    get regionalLimit(): Iso3166Alpha2Code[] | undefined {
        return this.parameters.regionalLimit
    }

    get expiration(): string | undefined {
        return this.parameters.expiration;
    }

    get details(): string {
        return JSON.stringify(this.parameters)
    }

    static fromDetails(licenseLocId: UUID, details: string): LogionClassification {
        const parameters = JSON.parse(details);
        if (parameters.transferredRights === undefined) {
            parameters.transferredRights = [];
        }
        return new LogionClassification(licenseLocId, parameters);
    }

    static requireIsoDate(date: string | undefined) {
        if (date) {
            if (!DateTime.fromISO(date).isValid) {
                throw new Error("Invalid date");
            }
        }
    }
}
