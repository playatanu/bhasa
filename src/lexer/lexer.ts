import { Token } from "./token.ts";
import Tokenizer from "./tokenizer.ts";

export default class Lexer {
  public getTokens(src: string): Array<Token> {
    const tokenizer = new Tokenizer();
    return tokenizer.createTokens(src)
  }
}
