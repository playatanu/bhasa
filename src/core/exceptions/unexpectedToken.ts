export default class UnexpecteToken extends Error {
    constructor(message: string, cause: string = "") {
        super(message);
        this.stack = "";
        this.name = "UnexpecteTokenError"
        this.cause = cause;
        this.message = message;
    }
}
