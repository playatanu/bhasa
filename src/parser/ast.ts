import { NodeType } from "./nodeType.ts";

export interface Statement {
    kind: NodeType;
}

/** A Program is a Array of Statement */
export interface Program extends Statement {
    kind: NodeType;
    body: Array<Statement>;
}


export interface VariableDeclartion extends Statement {
    kind: "VariableDeclartion";
    constant: boolean;
    identifier: string;
    value?: Expression;
}


/** Every Statement has a Expression */
export interface Expression extends Statement {
    
 }

export interface AssignmentExpression extends Expression { 
    kind:"AssignmentExpression",
    assigne:Expression;
    value:Expression;
}

/** BinaryExpression has a 3 type of value leftside operator Rightside [1 + 1] */
export interface BinaryExpression extends Expression {
    kind: "BinaryExpression";
    left: Expression;
    operator: string;
    right: Expression;
}

export interface Identifier extends Expression {
    kind: "Identifier";
    symbol: string;
}

export interface NumericalLiteral extends Expression {
    kind: "NumericalLiteral";
    value: number;
}
