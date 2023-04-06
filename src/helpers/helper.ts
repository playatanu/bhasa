export function isSkippable(str: string): boolean {
    return str == " " || str == "\n" || str == "\t" || str == "\r";
}

export function isBrackets(str: string): boolean {
    return str == "(" || str == ")" || str == "{" || str == "}" || str == "[" || str == "]";
}

export function isSymbol(str: string): boolean {
    return str == "=" || str == ";" || str == ":" || str == "," || str == ".";
}


export function isBinaryOperator(str: string): boolean {
    return str == "+" || str == "-" || str == "*" || str == "/" || str == "%"
}

export function isInteger(str: string): boolean {
    const char = str.charCodeAt(0);
    const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
    return char >= bounds[0] && char <= bounds[1];
}

export function isAlphabet(str: string): boolean {
    str.toLocaleLowerCase();
    const char = str.charCodeAt(0);
    const bounds = ["a".charCodeAt(0), "z".charCodeAt(0)];
    return char >= bounds[0] && char <= bounds[1];
}