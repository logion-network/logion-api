export function newBackendError(error: any): Error {
    if(error.response.data.errorMessage) {
        return new Error(`${error.message}: ${error.response.data.errorMessage}`);
    } else if(error.response.data.error) {
        return new Error(`${error.message}: ${error.response.data.error}`);
    } else {
        return new Error(`${error.message}: ${error.response.data}`);
    }
}
