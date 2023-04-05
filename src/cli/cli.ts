import HandleError from "../core/exceptions/handleError.ts";

import Lexer from "../lexer/lexer.ts";

const lexer = new Lexer();

const filePath = Deno.args[0];

console.log("Welcome to Bhasa v0.1");


if (filePath && filePath.split('.').pop() != 'bha') {
  throw new HandleError("ExtensionNameError",
    "use .bha as file extension",
    `.${filePath.split('.').pop()} is not valid extension`)
}


if (filePath) {
  const srccode = (await Deno.readTextFile(filePath)) as string;
  const tokens = lexer.getTokens(srccode);
  console.log(tokens);
}

if (!filePath) {
  while (true) {
    const srccode = prompt(">") as string;
    if (srccode == "exit") Deno.exit(1);
    const tokens = lexer.getTokens(srccode);
    console.log(tokens);
  }
}
