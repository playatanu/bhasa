import { TokenType } from "./tokenType.ts";

const KEYWORDS: Record<string, TokenType> = {
    dhori: TokenType.Let,
    const: TokenType.Const
};
export default KEYWORDS;