import { Expression, Identifier, Program, Statement, NumericalLiteral, BinaryExpression, VariableDeclartion, AssignmentExpression } from "./ast.ts";
import { TokenType } from "../lexer/tokenType.ts";
import { Token } from "../lexer/token.ts";
import Lexer from "../lexer/lexer.ts";

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
            throw `${tokenType} not found during parsing! `
        }

        return prevToken;
    }

    private isNotEOf(): boolean {
        return this.tokens[0].type != TokenType.EOF;
    }

    private parseStatement(): Statement {

        switch (this.tokenAt().type) {
            case TokenType.Let:
            case TokenType.Const:
                return this.parseVariableDeclaration();
            default:
                return this.parseExpression()
        }
    }

    private parseExpression(): Expression {
        return this.parseAssigmentExpression();
    }

    private parseAssigmentExpression(): Expression {
        const left = this.parseAdditiveExpression();
        if (this.tokenAt().type == TokenType.Equals) {
            this.tokenNext();
            const value = this.parseAssigmentExpression();

            this.expetedToken(TokenType.Semicolon);

            return { kind: "AssignmentExpression", value: value, assigne: left } as AssignmentExpression;
        }

        return left;
    }

    private parseAdditiveExpression(): Expression {
        let left = this.parseMuliplitiveExpression();

        while (isBinaryOperator(this.tokenAt().value)) {
            const operator = this.tokenNext().value;
            const right = this.parseMuliplitiveExpression();
            left = {
                kind: "BinaryExpression",
                left: left,
                operator: operator,
                right: right,
            } as BinaryExpression;
        }

        return left;
    }

    private parseMuliplitiveExpression(): Expression {
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

            case TokenType.Number:
                return { kind: "NumericalLiteral", value: parseFloat(this.tokenNext().value) } as NumericalLiteral;

            case TokenType.OpenParen: {
                this.tokenNext();
                const expression = this.parseExpression();
                this.expetedToken(TokenType.CloseParen);
                return expression;
            }

            default:
                throw `Unexpected token found ${tokenType} during parsing!`;

        }
    }


    private parseVariableDeclaration(): Statement {
        const isConstant = this.tokenNext().type == TokenType.Const;
        const identifier = this.expetedToken(TokenType.Identifier).value;

        if (this.tokenAt().type == TokenType.Semicolon) {
            this.tokenNext()

            if (isConstant) {
                throw "const expreesin No value provide";
            }

            return { kind: "VariableDeclartion", identifier: identifier, constant: false } as VariableDeclartion;
        }

        this.expetedToken(TokenType.Equals);

        const decleration = {
            kind: "VariableDeclartion",
            constant: isConstant,
            identifier: identifier,
            value: this.parseExpression()
        } as VariableDeclartion;

        this.expetedToken(TokenType.Semicolon);
        return decleration;
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