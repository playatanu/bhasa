export default class UnsupportedToken extends Error {
  constructor(message: string, cause: string = "") {
    super(message);
    this.stack = "";
    this.name = "UnsupportedTokenError"
    this.cause = cause;
    this.message = message;
  }
}
