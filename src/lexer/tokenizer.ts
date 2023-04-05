import { TokenType } from "../core/constants/tokenType.ts";
import UnsupportedTypeException from "../core/exceptions/unsupportedTypeException.ts";
import { Token } from "../core/interfaces/token.ts";
import { isAlphabet, isBinaryOperator, isBrackets, isInteger, isSkippable, isSymbol } from "./helper.ts";

const KEYWORDS: Record<string, TokenType> = {
  let: TokenType.Let,
};

function token(value = "", type: TokenType): Token {
  return { value, type };
}

export default function createToken(srccode: string): Array<Token> {

  const tokens = new Array<Token>();

  const src = srccode.split("");

  while (src.length > 0) {


    if (isBrackets(src[0])) {
      if (src[0] == "(") tokens.push(token(src.shift(), TokenType.OpenParen));
      if (src[0] == ")") tokens.push(token(src.shift(), TokenType.CloseParen));
      if (src[0] == "{") tokens.push(token(src.shift(), TokenType.OpenBrace));
      if (src[0] == "}") tokens.push(token(src.shift(), TokenType.CloseBrace));
      if (src[0] == "[") tokens.push(token(src.shift(), TokenType.OpenBracket));
      if (src[0] == "]") tokens.push(token(src.shift(), TokenType.CloseBracket));
    }

    else if (isSymbol(src[0])) {
      if (src[0] == "=") tokens.push(token(src.shift(), TokenType.Equals));
      if (src[0] == ":") tokens.push(token(src.shift(), TokenType.Colon));
      if (src[0] == ",") tokens.push(token(src.shift(), TokenType.Comma));
      if (src[0] == ".") tokens.push(token(src.shift(), TokenType.Dot));
      if (src[0] == ";") tokens.push(token(src.shift(), TokenType.Semicolon));
    }

    else if (isBinaryOperator(src[0])) {
      tokens.push(token(src.shift(), TokenType.BinaryOperator));
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
        tokens.push(token(num, TokenType.Number));
      }

      else if (isAlphabet(src[0])) {
        let str = "";
        while (src.length > 0 && isAlphabet(src[0])) {
          str += src.shift();
        }

        const reserved = KEYWORDS[str];

        if (reserved != undefined) { tokens.push(token(str, reserved)); }

        if (reserved == undefined) { tokens.push(token(str, TokenType.Identifier)); }

      }

      else {
        throw new UnsupportedTypeException(`Unreconized character found in source: ${src[0]}`);
      }

    }

  }

  return tokens;
}
