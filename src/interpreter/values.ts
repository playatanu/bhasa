export type ValueType = "null" | "number" | "boolean";

export interface RuntimeValue {
    type: ValueType;
}

export interface NullValue extends RuntimeValue {
    type: "null",
    value: null
}

export function MK_NULL() {
    return { type: "null", value: null } as NullValue;
}

export interface NumberValue extends RuntimeValue {
    type: "number",
    value: number
}

export function MK_NUM(num = 0) {
    return { type: "number", value: num } as NumberValue;
}


export interface BooleanValue extends RuntimeValue {
    type: "boolean",
    value: boolean
}

export function MK_BOOL(bool = true) {
    return { type: "boolean", value: bool } as BooleanValue;
}


export interface ConsoleValue extends RuntimeValue {
    type: "null",
    value: null
}
