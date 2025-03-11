export class ValidationError<T> extends Error {
    constructor(public errorObject: T) {
        super('Validation Error')
        this.name = 'ValidationError'
    }
}