export class NotFoundError extends Error {
    status: number;

    constructor(message: string, status: number = 404) {
        super(message);
        this.status = status;
        // Set the prototype explicitly (necessary when extending built-in classes like Error)
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}