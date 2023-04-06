import { Program, VariableDeclartion } from "../../parser/ast.ts";
import Environment from "../environment.ts";
import { evaluate } from "../interperter.ts";
import { RuntimeValue, MK_NULL } from "../values.ts";

export function evaluateProgram(program: Program, env: Environment): RuntimeValue {
    let lastEvaluated: RuntimeValue = MK_NULL();

    for (const statement of program.body) {
        lastEvaluated = evaluate(statement, env);
    }

    return lastEvaluated;
}

export function evaluateVariableDeclartion(declaration: VariableDeclartion, env: Environment): RuntimeValue {
    const value = declaration.value ? evaluate(declaration.value, env) : MK_NULL();
    return env.declareVariable(declaration.identifier, value,declaration.constant);
}



