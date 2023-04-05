export default class UnsupportedAst extends Error {
    constructor(message: string, cause: string = "") {
        super(message);
        this.stack = "";
        this.name = "UnsupportedAstError"
        this.cause = cause;
        this.message = message;
    }
}
