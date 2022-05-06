import axios, { AxiosInstance } from "axios";
import { AxiosFactory } from "./AxiosFactory";
import { LegalOfficer } from "./Types";

export class DirectoryClient {

    constructor(directoryEndpoint: string, axiosFactory: AxiosFactory, token?: string) {
        this.authenticated = token !== undefined;
        if(token) {
            this.axios = axiosFactory.buildAxiosInstance(directoryEndpoint, token);
        } else {
            this.axios = axios.create({ baseURL: directoryEndpoint });
        }
    }

    private authenticated: boolean;

    private axios: AxiosInstance;

    async getLegalOfficers(): Promise<LegalOfficer[]> {
        const legalOfficers = (await this.axios.get("/api/legal-officer")
            .then(response => response.data.legalOfficers)) as LegalOfficer[];
        return legalOfficers.map(data => ({
            ...data,
            name: `${data.userIdentity.firstName} ${data.userIdentity.lastName}`
        }));
    }

    async createOrUpdate(legalOfficer: LegalOfficer) {
        if(!this.authenticated) {
            throw new Error("Authentication is required");
        }
        await this.axios.put('/api/legal-officer', legalOfficer);
    }
}
