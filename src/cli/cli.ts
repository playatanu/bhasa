import UnsupportedFile from "../core/exceptions/unsupportedFile.ts";

import Parser from "../parser/parser.ts";

import Interpeter from "../interpreter/interperter.ts";
import Environment from "../interpreter/environment.ts";
import { MK_BOOL, MK_NULL, MK_NUM, RuntimeValue } from "../interpreter/values.ts";

const parser = new Parser();

const interpeter = new Interpeter();

const env = new Environment();

const filePath = Deno.args[0];

console.log("Welcome to Bhasa v0.1");


if (filePath && filePath.split('.').pop() != 'bha') {
  throw new UnsupportedFile("." + filePath.split('.').pop() + " is not valid extension", "." + filePath.split('.').pop())
}


if (filePath) {
  try {
    const srccode = (await Deno.readTextFile(filePath)) as string;
    const program = parser.produceAST(srccode);
    const result = interpeter.evaluate(program, env);
    console.log(result);
  }
  catch (err) {
    // throw new File Not Found Error
    console.log(err.message)
  }

}

if (!filePath) {
  env.declareVariable("x", MK_NUM(10));
  env.declareVariable("null", MK_NULL());
  env.declareVariable("false", MK_BOOL(false));
  while (true) {
    const srccode = prompt(">") as string;
    if (srccode == "exit") {
      console.log("bye")
      Deno.exit(1);
    }
    const program = parser.produceAST(srccode);
    const result = interpeter.evaluate(program, env);
    console.log(result);
  }
}
