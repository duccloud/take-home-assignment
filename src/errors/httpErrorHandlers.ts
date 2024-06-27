import { HttpError } from './HttpError';

export class InvalidTokenError extends HttpError {
    constructor(message: string = 'Invalid token') {
        super(message, 401);
        Object.setPrototypeOf(this, InvalidTokenError.prototype);
    }
}

export class ResourceNotFoundError extends HttpError {
    constructor(message: string) {
        super(message, 404);
        Object.setPrototypeOf(this, ResourceNotFoundError.prototype);
    }
}

export class BadRequestError extends HttpError {
    constructor(message: string) {
        super(message, 400);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}

export class DataError extends HttpError {
    constructor(message: string) {
        super(message, 500);
        Object.setPrototypeOf(this, DataError.prototype);
    }
}