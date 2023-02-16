export function newBackendError(error: any): Error { // eslint-disable-line @typescript-eslint/no-explicit-any
    if(error.response.data.errorMessage) {
        return new Error(`${error.message}: ${error.response.data.errorMessage}`);
    } else {
        return new Error(`${error.message}: ${JSON.stringify(error.response.data)}`);
    }
}
