export function newBackendError(error: any): Error { // eslint-disable-line @typescript-eslint/no-explicit-any
    if(error.response && error.response.data && error.response.data.errorMessage) {
        return new Error(`${error.message}: ${error.response.data.errorMessage}`);
    } else if(error.response && error.response.data) {
        return new Error(`${error.message}: ${JSON.stringify(error.response.data)}`);
    } else {
        return error;
    }
}
