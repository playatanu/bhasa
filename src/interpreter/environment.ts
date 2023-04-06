import { RuntimeValue } from "./values.ts";

export default class Environment {
    private parentEnv?: Environment;
    private variables: Map<string, RuntimeValue>;
    private constants: Set<string>;

    constructor(parentEnv?: Environment) {
        this.parentEnv = parentEnv;
        this.variables = new Map();
        this.constants = new Set();
    }

    public declareVariable(varname: string, value: RuntimeValue, constant: boolean): RuntimeValue {
        if (this.variables.has(varname)) {
            throw `Identifier ${varname} has already been declared`;
        }

        this.variables.set(varname, value);

        if (constant) {
            this.constants.add(varname);
        }

        return value;
    }

    public resolve(varname: string): Environment {
        if (this.variables.has(varname)) {
            return this;
        }

        if (this.parentEnv == undefined) {
            throw `cannot resolve variable ${varname}`;
        }

        return this.parentEnv.resolve(varname) as Environment;
    }

    public lookupVariable(varname: string): RuntimeValue {
        const env = this.resolve(varname);
        return env.variables.get(varname) as RuntimeValue;
    }


    public assignVariable(varname: string, value: RuntimeValue): RuntimeValue {
        const env = this.resolve(varname);


        if (env.constants.has(varname)) {
            throw `cannot assignment to constant variable ${varname}`;
        }

        env.variables.set(varname, value);
        return value as RuntimeValue;
    }

}