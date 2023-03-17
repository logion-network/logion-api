import { UUID } from "@logion/node-api";

import { LocClient, UploadableCollectionItem, UploadableItemFile } from "./LocClient.js";
import { ItemTokenWithRestrictedType } from "./Token.js";
import { LogionClassification, SpecificLicense, TermsAndConditionsElement, CreativeCommons } from "./license/index.js";
import { CheckHashResult } from "./Loc.js";
import { checkCertifiedCopy, CheckCertifiedCopyResult } from "./Deliveries.js";
import { downloadFile, TypedFile } from "./Http.js";

export class CollectionItem implements UploadableCollectionItem {

    constructor(args: {
        locId: UUID,
        locClient: LocClient,
        clientItem: UploadableCollectionItem,
    }) {
        this._locId = args.locId;
        this.locClient = args.locClient;
        this.clientItem = args.clientItem;

        const logionClassifications = args.clientItem.termsAndConditions
            .filter(element => element.type === "logion_classification")
            .map(element => element as LogionClassification);
        if(logionClassifications.length > 0) {
            this._logionClassification = logionClassifications[0];
        } else if(logionClassifications.length > 1) {
            throw new Error("Terms and conditions must include at most one logion classification element");
        }

        const creativeCommons = args.clientItem.termsAndConditions
            .filter(element => element.type === "CC4.0")
            .map(element => element as CreativeCommons);
        if(creativeCommons.length > 0) {
            this._creativeCommons = creativeCommons[0];
        } else if(creativeCommons.length > 1) {
            throw new Error("Terms and conditions must include at most one Creative Commons element");
        }

        this._specificLicenses = args.clientItem.termsAndConditions
            .filter(element => element.type === "specific_license")
            .map(element => element as SpecificLicense);
    }

    private readonly _locId: UUID;

    private locClient: LocClient;

    private clientItem: UploadableCollectionItem;

    private readonly _logionClassification: LogionClassification | undefined;

    private readonly _specificLicenses: SpecificLicense[];

    private readonly _creativeCommons: CreativeCommons | undefined;

    get locId(): UUID {
        return this._locId;
    }

    get id(): string {
        return this.clientItem.id;
    }

    get description(): string {
        return this.clientItem.description;
    }

    get addedOn(): string {
        return this.clientItem.addedOn;
    }

    get files(): UploadableItemFile[] {
        return this.clientItem.files;
    }

    get token(): ItemTokenWithRestrictedType | undefined {
        return this.clientItem.token;
    }

    get restrictedDelivery(): boolean {
        return this.clientItem.restrictedDelivery;
    }

    get termsAndConditions(): TermsAndConditionsElement[] {
        return this.clientItem.termsAndConditions;
    }

    get logionClassification(): LogionClassification | undefined {
        return this._logionClassification;
    }

    get specificLicenses(): SpecificLicense[] {
        return this._specificLicenses;
    }

    get creativeCommons(): CreativeCommons | undefined {
        return this._creativeCommons;
    }

    getItemFile(hash: string): UploadableItemFile | undefined {
        return this.clientItem.files.find(file => file.hash === hash);
    }

    checkHash(hash: string): CheckHashResult {
        return {
            collectionItemFile: this.getItemFile(hash)
        }
    }

    async checkCertifiedCopy(hash: string): Promise<CheckCertifiedCopyResult> {
        if(!this.clientItem.restrictedDelivery) {
            throw new Error("No restricted delivery possible with this item");
        }

        const deliveries = await this.locClient.getDeliveries({ locId: this._locId, itemId: this.clientItem.id });
        return checkCertifiedCopy(deliveries, hash);
    }

    async isAuthenticatedTokenOwner(): Promise<boolean> {
        try {
            await this.locClient.backend().get(`/api/collection/${ this._locId.toString() }/items/${ this.clientItem.id }/check`);
            return true;
        } catch(e) {
            return false;
        }
    }

    async getFile(hash: string): Promise<TypedFile> {
        return downloadFile(this.locClient.backend(), `/api/collection/${ this._locId.toString() }/${ this.clientItem.id }/files/${ hash }/source`);
    }
}
