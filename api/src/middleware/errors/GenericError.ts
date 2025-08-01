export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500
}

export class GenericError extends Error {
    statusCode: HttpStatus;

    constructor(message: string, statusCode: HttpStatus) {
        super(message);
        this.name = 'GenericError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, GenericError.prototype);
    }
}