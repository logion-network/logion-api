import { AxiosInstance } from "axios";
import { AxiosFactory } from "./AxiosFactory.js";
import { LegalOfficer, LegalOfficerClass } from "./Types.js";

export class DirectoryClient {

    constructor(directoryEndpoint: string, axiosFactory: AxiosFactory, token?: string) {
        this.authenticated = token !== undefined;
        this.axiosFactory = axiosFactory;
        this.token = token;

        this.axios = axiosFactory.buildAxiosInstance(directoryEndpoint, token);
    }

    private authenticated: boolean;

    private axiosFactory: AxiosFactory;

    private token: string | undefined;

    private axios: AxiosInstance;

    async getLegalOfficers(): Promise<LegalOfficerClass[]> {
        const legalOfficers = (await this.axios.get("/api/legal-officer")
            .then(response => response.data.legalOfficers)) as LegalOfficer[];
        return legalOfficers
            .map(data => new LegalOfficerClass({
                legalOfficer: {
                    ...data,
                    name: `${data.userIdentity.firstName} ${data.userIdentity.lastName}`
                },
                axiosFactory: this.axiosFactory,
                token: this.token,
            }));
    }

    async createOrUpdate(legalOfficer: LegalOfficer) {
        if(!this.authenticated) {
            throw new Error("Authentication is required");
        }
        await this.axios.put('/api/legal-officer', legalOfficer);
    }
}
