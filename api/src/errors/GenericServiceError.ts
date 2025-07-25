export class GenericServiceError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.name = 'GenericServiceError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, GenericServiceError.prototype);
    }
}