/**
 * Custom error class for bad request when the API returns an error
 * or the endpoint is not found.
 *
 * @class BadRequestError
 * @extends {Error}
 */
export class BadRequestError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "BadRequestError"
    }
}
