export class UnCaughtError extends Error {
    status: number;

    constructor(message: string, status: number = 500) {
        super(message);
        this.status = status;
        // Set the prototype explicitly (necessary when extending built-in classes like Error)
        Object.setPrototypeOf(this, UnCaughtError.prototype);
    }
}