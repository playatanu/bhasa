import { runCodeCmd, runFile } from "./execute.ts";
import { showVersion } from "./helpers.ts";

const arg0 = Deno.args[0];
const arg1 = Deno.args[1];

switch (arg0) {
  case "run":
    runFile(arg1);
    break;

  case "--version":
  case "--v":
  case "-version":
  case "-v":
    showVersion();
    break;

  default:
    runCodeCmd();
    
}





