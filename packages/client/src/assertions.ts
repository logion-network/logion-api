export function requireDefined<T>(value: T | undefined, errorSupplier?: () => Error): T {
    if(value === undefined) {
        if (errorSupplier) {
            throw errorSupplier();
        } else {
            throw new Error("Value is undefined");
        }
    } else {
        return value;
    }

}
