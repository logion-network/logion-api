export function newBackendError(error: any): Error {
    if(error.response.data.errorMessage) {
        return new Error(`${error.message}: ${error.response.data.errorMessage}`);
    } else {
        return new Error(`${error.message}: ${error.response.data}`);
    }
}
