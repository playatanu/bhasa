import { Expression, Identifier, Program, Statement, NumericalLiteral, BinaryExpression, NullLiteral } from "./ast.ts";
import { TokenType } from "../lexer/tokenType.ts";
import { Token } from "../lexer/token.ts";
import Lexer from "../lexer/lexer.ts";
import UnexpectedToken from '../core/exceptions/unexpectedToken.ts';

import { isBinaryOperator } from "../core/helpers/helper.ts";

const lexer = new Lexer();

export default class Parser {
    private tokens: Array<Token> = [];

    private tokenAt(): Token {
        return this.tokens[0] as Token;
    }

    private tokenNext(): Token {
        return this.tokens.shift() as Token;
    }

    private expetedToken(tokenType: TokenType): Token {
        const prevToken = this.tokenNext() as Token;
        if (!prevToken || prevToken.type != tokenType) {
            throw new UnexpectedToken("Unexpected token found during parsing! ", tokenType)
        }

        return prevToken;
    }

    private isNotEOf(): boolean {
        return this.tokens[0].type != TokenType.EOF;
    }

    private parseStatement(): Statement {
        return this.parseExpression()
    }

    private parseExpression(): Expression {
        return this.parceAdditiveExpression();
        //return this.parsePrimaryExpression();
    }

    private parceAdditiveExpression(): Expression {
        let left = this.parceMuliplitiveExpression();

        while (isBinaryOperator(this.tokenAt().value)) {
            const operator = this.tokenNext().value;
            const right = this.parceMuliplitiveExpression();
            left = {
                kind: "BinaryExpression",
                left: left,
                operator: operator,
                right: right,
            } as BinaryExpression;
        }

        return left;
    }

    private parceMuliplitiveExpression(): Expression {
        let left = this.parsePrimaryExpression();

        while (isBinaryOperator(this.tokenAt().value)) {
            const operator = this.tokenNext().value;
            const right = this.parsePrimaryExpression();
            left = {
                kind: "BinaryExpression",
                left: left,
                operator: operator,
                right: right,
            } as BinaryExpression;
        }

        return left;
    }


    private parsePrimaryExpression(): Expression {
        const tokenType = this.tokenAt().type;

        switch (tokenType) {
            case TokenType.Identifier:
                return { kind: "Identifier", symbol: this.tokenNext().value } as Identifier;

            case TokenType.Null:
                this.tokenNext();
                return { kind: "NullLiteral", value: "null" } as NullLiteral;

            case TokenType.Number:
                return { kind: "NumericalLiteral", value: parseFloat(this.tokenNext().value) } as NumericalLiteral;

            case TokenType.OpenParen: {
                this.tokenNext();
                const expression = this.parseExpression();
                this.expetedToken(TokenType.CloseParen);
                return expression;
            }

            default:
                throw new UnexpectedToken("Unexpected token found during parsing!");

        }
    }


    public produceAST(sourceCode: string): Program {

        this.tokens = lexer.getTokens(sourceCode);

        const program: Program = {
            kind: "Program",
            body: [],
        }

        // Parse until end of file 
        while (this.isNotEOf()) {
            //console.log("call");
            program.body.push(this.parseStatement());
        }

        return program;
    }
}