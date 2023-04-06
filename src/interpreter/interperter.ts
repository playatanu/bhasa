import { RuntimeValue, NumberValue, MK_NULL } from './values.ts';
import { BinaryExpression, Identifier, NumericalLiteral, Program, Statement } from '../parser/ast.ts';
import UnsupportedAst from '../core/exceptions/unsupportedAst.ts';
import Environment from './environment.ts';

export default class Interpeter {

    private evaluateProgram(program: Program, env: Environment): RuntimeValue {
        let lastEvaluated: RuntimeValue = MK_NULL();

        for (const statement of program.body) {
            lastEvaluated = this.evaluate(statement, env);
        }

        return lastEvaluated;
    }

    private evaluateIdentifier(identifier: Identifier, env: Environment): RuntimeValue {
        const valiable = env.lookupVariable(identifier.symbol);
        return valiable;
    }

    private evaluateBinaryExpression(binaryExpression: BinaryExpression, env: Environment): RuntimeValue {

        const lhs = this.evaluate(binaryExpression.left, env);
        const rhs = this.evaluate(binaryExpression.right, env);
        const op = binaryExpression.operator;

        if (lhs.type == "number" && rhs.type == "number") {
            return this.evaluatemumericBinaryExpression(lhs as NumberValue, rhs as NumberValue, op as string);
        }

        return MK_NULL();
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



    public evaluate(astNode: Statement, env: Environment): RuntimeValue {

        switch (astNode.kind) {
            case "NumericalLiteral":
                return { value: ((astNode as NumericalLiteral).value), type: "number" } as NumberValue

            case "Program":
                return this.evaluateProgram(astNode as Program, env);

            case "Identifier":
                return this.evaluateIdentifier(astNode as Identifier, env);

            case "BinaryExpression":
                return this.evaluateBinaryExpression(astNode as BinaryExpression, env);

            default:
                throw new UnsupportedAst("Unsupported Ast Found during evaluate! ", astNode.kind);
        }
    }
} 