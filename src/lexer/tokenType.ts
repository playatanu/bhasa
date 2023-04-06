export enum TokenType {
  Identifier = "Identifier", // varname
  String = "String", // abcd
  Number = "Number", // 1234
  Boolean = "Boolean", // true

  // keywords
  Let = "Let",
  Const = "Const",

  BinaryOperator = "BinaryOperator",
  Equals = "Equals", // =
  Comma = "Comma", // ,
  Dot = "Dot", // .
  Colon = "Colon", // :
  Semicolon = "Semicolon", // ;
  OpenParen = "OpenParen", // (
  CloseParen = "CloseParen", // )
  OpenBrace = "OpenBrace", // {
  CloseBrace = "CloseBrace", // }
  OpenBracket = "OpenBracket", // [
  CloseBracket = "CloseBracket", // ]

  EOF = "EOF", // End Of File
}
