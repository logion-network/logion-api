import { Duration } from "luxon";

export interface PollingParameters {
    readonly period: Duration;
    readonly maxRetries: number;
}

export interface WaitForParameters<T> {
    readonly pollingParameters?: PollingParameters;
    readonly producer: (previousValue?: T) => Promise<T>;
    readonly predicate: (value: T) => boolean;
}

export const DEFAULT_POLLING_PARAMETERS: PollingParameters = {
    period: Duration.fromMillis(1000),
    maxRetries: 20,
};

export function waitFor<T>(params: WaitForParameters<T>): Promise<T> {
    let retries = 0;
    const actualPollingParams = params.pollingParameters !== undefined ? params.pollingParameters : DEFAULT_POLLING_PARAMETERS;
    let previousValue: T | undefined;
    return new Promise<T>((resolve, reject) => {
        const handle = setInterval(async () => {
            try {
                const newState = await params.producer(previousValue);
                if(params.predicate(newState)) {
                    clearInterval(handle);
                    resolve(newState);
                } else {
                    ++retries;
                }
                previousValue = newState;
                if(retries >= actualPollingParams.maxRetries) {
                    clearInterval(handle);
                    reject(new Error("Maximum number of retries reached"));
                }
            } catch(e) {
                clearInterval(handle);
                reject(e);
            }
        }, actualPollingParams.period.milliseconds);
    });
}
