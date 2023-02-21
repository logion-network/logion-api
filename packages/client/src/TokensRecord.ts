import { UUID } from "@logion/node-api";

import { LocClient, ClientTokensRecord, UploadableItemFile } from "./LocClient.js";
import { CheckHashResult } from "./Loc.js";
import { CheckCertifiedCopyResult, CheckResultType } from "./Deliveries.js";

export class TokensRecord implements ClientTokensRecord {

    constructor(args: {
        locId: UUID,
        locClient: LocClient,
        tokensRecord: ClientTokensRecord,
    }) {
        this._locId = args.locId;
        this.locClient = args.locClient;
        this.record = args.tokensRecord;
    }

    private readonly _locId: UUID;

    private locClient: LocClient;

    private record: ClientTokensRecord;

    get locId(): UUID {
        return this._locId;
    }

    get id(): string {
        return this.record.id;
    }

    get description(): string {
        return this.record.description;
    }

    get addedOn(): string {
        return this.record.addedOn;
    }

    get issuer(): string {
        return this.record.issuer;
    }

    get files(): UploadableItemFile[] {
        return this.record.files;
    }

    getRecordFile(hash: string): UploadableItemFile | undefined {
        return this.record.files.find(file => file.hash === hash);
    }

    checkHash(hash: string): CheckHashResult {
        return {
            recordFile: this.getRecordFile(hash)
        }
    }

    async checkCertifiedCopy(hash: string): Promise<CheckCertifiedCopyResult> {
        try {
            const delivery = await this.locClient.checkTokensRecordDelivery({
                locId: this._locId,
                recordId: this.record.id,
                hash,
            });
            return {
                summary: CheckResultType.POSITIVE,
                logionOrigin: CheckResultType.POSITIVE,
                latest: CheckResultType.NEGATIVE,
                nftOwnership: CheckResultType.NEGATIVE,
                match: {
                    ...delivery,
                    belongsToCurrentOwner: false,
                }
            }
        } catch (e) {
            return {
                summary: CheckResultType.NEGATIVE,
                logionOrigin: CheckResultType.NEGATIVE,
                latest: CheckResultType.NEGATIVE,
                nftOwnership: CheckResultType.NEGATIVE,
            }
        }
    }
}
