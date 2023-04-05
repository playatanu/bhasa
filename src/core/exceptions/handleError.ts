export default class HandleError extends Error {
    constructor(name: string, message: string, cause: string = "") {
        super(message);
        this.stack = "";
        this.name = name
        this.cause = cause;
        this.message = message;
    }
}