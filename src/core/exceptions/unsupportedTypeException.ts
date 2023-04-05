export default class UnsupportedTypeException extends Error {
  constructor(message: string, cause: string = "") {
    super(message);
    this.stack = "";
    this.name = "UnsupportedTypeError"
    //this.cause = cause;
    this.message = message;
  }
}
