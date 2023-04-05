import { TokenType } from "./tokenType.ts";

export interface Token {
  value: string;
  type: TokenType;
}
