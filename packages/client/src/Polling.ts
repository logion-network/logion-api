import { Duration } from "luxon";

export interface PollingParameters {
    readonly period: Duration;
    readonly maxRetries: number;
}

export interface WaitForParameters<T> {
    readonly pollingParameters?: PollingParameters;
    readonly producer: () => Promise<T>;
    readonly predicate: (value: T) => boolean;
}

export const DEFAULT_POLLING_PARAMETERS: PollingParameters = {
    period: Duration.fromMillis(1000),
    maxRetries: 20,
};

export function waitFor<T>(params: WaitForParameters<T>): Promise<T> {
    let retries = 0;
    const actualPollingParams = params.pollingParameters !== undefined ? params.pollingParameters : DEFAULT_POLLING_PARAMETERS;
    return new Promise<T>((resolve, reject) => {
        const handle = setInterval(async () => {
            try {
                const newState = await params.producer();
                if(params.predicate(newState)) {
                    clearInterval(handle);
                    resolve(newState);
                } else {
                    ++retries;
                }
                if(retries >= actualPollingParams.maxRetries) {
                    clearInterval(handle);
                    reject(new Error("Maximum number of retries reached"));
                }
            } catch(e) {
                clearInterval(handle);
            }
        }, actualPollingParams.period.milliseconds);
    });
}
