import Parser from "../parser/parser.ts";
import Environment from "../interpreter/environment.ts";
import { evaluate } from "../interpreter/interperter.ts";
import { ConsoleValue } from "../interpreter/values.ts";
import { showCliDetails } from "./helpers.ts";

const parser = new Parser();
const env = new Environment();

export async function runFile(arg1: string) {
    showCliDetails();

    if (!arg1) {
        throw "file path not provide";
    }

    if (arg1) {

        try {
            const srccode = (await Deno.readTextFile(arg1)) as string;
            const program = parser.produceAST(srccode);

            //  const result = evaluate(program, env);
            //  console.log(result);

            const raw = evaluate(program, env) as ConsoleValue;
            console.log(raw.value);
        }
        catch (err) {

            throw err.message;
        }
    }

}


export function runCodeCmd() {

    showCliDetails();

    while (true) {
        const srccode = prompt(">") as string;

        if (srccode == null) {
            continue;
        }

        if (srccode == "exit" || srccode == "exit;") {
            console.log("bye")
            Deno.exit(1);
        }

        const program = parser.produceAST(srccode);

        // const result = evaluate(program, env);
        // console.log(result);

        const raw = evaluate(program, env) as ConsoleValue;
        console.log(raw.value);
    }

}