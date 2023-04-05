
import { Token } from "../core/interfaces/token.ts";
import createToken from "./tokenizer.ts";

export default class Lexer {

  public getTokens(src: string): Array<Token> {
    return createToken(src);
  }
}
