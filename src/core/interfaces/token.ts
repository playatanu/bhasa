import { TokenType } from "../constants/tokenType.ts";

export interface Token {
  value: string;
  type: TokenType;
}
