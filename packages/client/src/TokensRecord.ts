import { Hash, UUID } from "@logion/node-api";

import { LocClient, ClientTokensRecord, UploadableItemFile } from "./LocClient.js";
import { CheckHashResult } from "./Loc.js";
import { CheckCertifiedCopyResult, CheckResultType } from "./Deliveries.js";
import { HashString } from "./Hash.js";

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

    get id(): Hash {
        return this.record.id;
    }

    get description(): HashString {
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

    getRecordFile(hash: Hash): UploadableItemFile | undefined {
        return this.record.files.find(file => file.hash.equalTo(hash));
    }

    checkHash(hash: Hash): CheckHashResult {
        return {
            recordFile: this.getRecordFile(hash)
        }
    }

    async checkCertifiedCopy(hash: Hash): Promise<CheckCertifiedCopyResult> {
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
