export default class UnsupportedFile extends Error {
    constructor(message: string, cause: string = "") {
        super(message);
        this.stack = "";
        this.name = "UnsupportedFileError"
        this.cause = cause;
        this.message = message;
    }
}
