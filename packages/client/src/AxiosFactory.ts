import axios, { AxiosInstance } from "axios";

export class AxiosFactory {

    buildAxiosInstance(endpoint?: string, token?: string): AxiosInstance {
        let headers = undefined;
        if(token !== undefined) {
            headers = {
                'Authorization': `Bearer ${token}`,
            };
        }

        const instance = axios.create({
            baseURL: endpoint,
            headers,
        });
        instance.interceptors.request.use(request => {
            console.log("AXIOS:%s %s", request.method, request.url);
            return request
        })
        return instance;
    }
}
