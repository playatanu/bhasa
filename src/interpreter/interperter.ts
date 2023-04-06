import { Statement,NumericalLiteral,Program,Identifier,BinaryExpression,AssignmentExpression,VariableDeclartion } from "../parser/ast.ts";
import Environment from "./environment.ts";
import { evaluateIdentifier,evaluateBinaryExpression,evaluateAssignmentExpression } from "./evaluate/expressions.ts";
import { evaluateProgram,evaluateVariableDeclartion } from "./evaluate/statement.ts";
import { RuntimeValue,NumberValue } from "./values.ts";

 export function evaluate(astNode: Statement, env: Environment): RuntimeValue {

    switch (astNode.kind) {
        case "NumericalLiteral":
            return { value: ((astNode as NumericalLiteral).value), type: "number" } as NumberValue

        case "Program":
            return evaluateProgram(astNode as Program, env);

        case "Identifier":
            return evaluateIdentifier(astNode as Identifier, env);

        case "BinaryExpression":
            return evaluateBinaryExpression(astNode as BinaryExpression, env);

        case "AssignmentExpression":
            return evaluateAssignmentExpression(astNode as AssignmentExpression, env);

        case "VariableDeclartion":
            return evaluateVariableDeclartion(astNode as VariableDeclartion, env);

        default:
            throw new Error("Unsupported Ast Found during evaluate! ", astNode.kind);
    }


} 