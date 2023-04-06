
import { AssignmentExpression, BinaryExpression, Identifier } from "../../parser/ast.ts";
import Environment from "../environment.ts";
import { evaluate } from "../interperter.ts";
import { RuntimeValue, NumberValue, MK_NULL } from "../values.ts";

export function evaluateIdentifier(identifier: Identifier, env: Environment): RuntimeValue {
    return env.lookupVariable(identifier.symbol);
}

export function evaluateBinaryExpression(binaryExpression: BinaryExpression, env: Environment): RuntimeValue {

    const lhs = evaluate(binaryExpression.left, env);
    const rhs = evaluate(binaryExpression.right, env);
    const operator = binaryExpression.operator;

    if (lhs.type == "number" && rhs.type == "number") {
        return evaluateNumericBinaryExpression(lhs as NumberValue, rhs as NumberValue, operator as string);
    }

    return MK_NULL();
}

export function evaluateNumericBinaryExpression(lhs: NumberValue, rhs: NumberValue, operator: string): NumberValue {
    let result = 0;

    if (operator == "+") {
        result = lhs.value + rhs.value;
    }

    else if (operator == "-") {
        result = lhs.value - rhs.value;
    }

    else if (operator == "*") {
        result = lhs.value * rhs.value;
    }

    else if (operator == "/") {
        result = lhs.value / rhs.value;
    }

    else if (operator == "%") {
        result = lhs.value % rhs.value;
    }

    return { value: result, type: "number" }
}

export function evaluateAssignmentExpression(node: AssignmentExpression, env: Environment): RuntimeValue {
    if (node.assigne.kind !== "Identifier") {
        throw "cc"
    }

    const varname = (node.assigne as Identifier).symbol;
    return env.assignVariable(varname, evaluate(node.value, env));
}


