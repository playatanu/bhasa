import { RuntimeValue } from "./values.ts";

export default class Environment {
    private parentEnv?: Environment;
    private variables: Map<string, RuntimeValue>;

    constructor(parentEnv?: Environment) {
        this.parentEnv = parentEnv;
        this.variables = new Map();
    }

    public declareVariable(varname: string, value: RuntimeValue): RuntimeValue {
        if (this.variables.has(varname)) {
            throw 'variable already defiend';
        }

        this.variables.set(varname, value);
        return value;
    }

    public resolve(varname: string): Environment {
        if (this.variables.has(varname)) {
            return this;
        }

        if (this.parentEnv == undefined) {
            throw 'cannot resolve variable';
        }

        return this.parentEnv.resolve(varname) as Environment;
    }

    public lookupVariable(varname: string): RuntimeValue {
        const env = this.resolve(varname);
        return env.variables.get(varname) as RuntimeValue;
    }


    public assignVariable(varname: string, value: RuntimeValue): RuntimeValue {
        const env = this.resolve(varname);
        env.variables.set(varname, value);
        return value as RuntimeValue;
    }

}