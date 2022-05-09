import axios, { AxiosInstance } from "axios";

export class AxiosFactory {

    buildAxiosInstance(endpoint?: string, token?: string): AxiosInstance {
        let headers: any = undefined;
        if(token !== undefined) {
            headers = {
                'Authorization': `Bearer ${token}`,
            };
        }
        return axios.create({
            baseURL: endpoint,
            headers,
        });
    }
}
