import { RuntimeValue, NumberValue, NullValue } from './values.ts';
import { BinaryExpression, NumericalLiteral, Program, Statement } from '../parser/ast.ts';
import UnsupportedAst from '../core/exceptions/unsupportedAst.ts';

export default class Interpeter {

    private evaluateProgram(program: Program): RuntimeValue {
        let lastEvaluated: RuntimeValue = { type: "null", value: "null" } as NullValue;

        for (const statement of program.body) {
            lastEvaluated = this.evaluate(statement);
        }

        return lastEvaluated;
    }

    private evaluateBinaryExpression(binaryExpression: BinaryExpression): RuntimeValue {

        const lhs = this.evaluate(binaryExpression.left);
        const rhs = this.evaluate(binaryExpression.right);
        const op = binaryExpression.operator;

        if (lhs.type == "number" && rhs.type == "number") {
            return this.evaluatemumericBinaryExpression(lhs as NumberValue, rhs as NumberValue, op as string);
        }

        return { type: "null", value: "null" } as NullValue;
    }

    private evaluatemumericBinaryExpression(lhs: NumberValue, rhs: NumberValue, operator: string): NumberValue {
        let result: number = 0;

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



    public evaluate(astNode: Statement): RuntimeValue {

        switch (astNode.kind) {
            case "NumericalLiteral":
                return { value: ((astNode as NumericalLiteral).value), type: "number" } as NumberValue

            case "NullLiteral":
                return { value: "null", type: "null" } as NullValue

            case "Program":
                return this.evaluateProgram(astNode as Program);

            case "BinaryExpression":
                return this.evaluateBinaryExpression(astNode as BinaryExpression);

            default:
                throw new UnsupportedAst("Unsupported Ast Found during evaluate! ", astNode.kind);
        }
    }
} 