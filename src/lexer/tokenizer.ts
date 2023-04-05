import { TokenType } from "./tokenType.ts";
import UnsupportedToken from "../core/exceptions/unsupportedToken.ts";
import { Token } from "./token.ts";
import { isAlphabet, isBinaryOperator, isBrackets, isInteger, isSkippable, isSymbol } from "../core/helpers/helper.ts";

const KEYWORDS: Record<string, TokenType> = {
  let: TokenType.Let,
  null: TokenType.Null
};

export default class Tokenizer {

  private createToken(value = "", type: TokenType): Token {
    return { value, type };
  }

  public createTokens(srccode: string): Array<Token> {

    const tokens = new Array<Token>();

    const src = srccode.split("");

    while (src.length > 0) {


      if (isBrackets(src[0])) {
        if (src[0] == "(") tokens.push(this.createToken(src.shift(), TokenType.OpenParen));
        if (src[0] == ")") tokens.push(this.createToken(src.shift(), TokenType.CloseParen));
        if (src[0] == "{") tokens.push(this.createToken(src.shift(), TokenType.OpenBrace));
        if (src[0] == "}") tokens.push(this.createToken(src.shift(), TokenType.CloseBrace));
        if (src[0] == "[") tokens.push(this.createToken(src.shift(), TokenType.OpenBracket));
        if (src[0] == "]") tokens.push(this.createToken(src.shift(), TokenType.CloseBracket));
      }

      else if (isSymbol(src[0])) {
        if (src[0] == "=") tokens.push(this.createToken(src.shift(), TokenType.Equals));
        if (src[0] == ":") tokens.push(this.createToken(src.shift(), TokenType.Colon));
        if (src[0] == ",") tokens.push(this.createToken(src.shift(), TokenType.Comma));
        if (src[0] == ".") tokens.push(this.createToken(src.shift(), TokenType.Dot));
        if (src[0] == ";") tokens.push(this.createToken(src.shift(), TokenType.Semicolon));
      }

      else if (isBinaryOperator(src[0])) {
        tokens.push(this.createToken(src.shift(), TokenType.BinaryOperator));
      }

      else {

        if (isSkippable(src[0])) {
          src.shift();
        }

        else if (isInteger(src[0])) {
          let num = "";
          while (src.length > 0 && isInteger(src[0])) {
            num += src.shift();
          }
          tokens.push(this.createToken(num, TokenType.Number));
        }

        else if (isAlphabet(src[0])) {
          let str = "";
          while (src.length > 0 && isAlphabet(src[0])) {
            str += src.shift();
          }

          const reserved = KEYWORDS[str];

          if (reserved != undefined) { tokens.push(this.createToken(str, reserved)); }

          if (reserved == undefined) { tokens.push(this.createToken(str, TokenType.Identifier)); }

        }

        else {
          throw new UnsupportedToken("Unreconized character found in source code during tokenize! ", src[0]);
        }

      }

    }
    tokens.push(this.createToken("EOF", TokenType.EOF));
    return tokens;
  }
}


