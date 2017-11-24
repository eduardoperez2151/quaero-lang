import {Exp, Stmt} from './ASTNode';
import {State} from '../interpreter/State';
import {ErrorTypeInfo} from "./ErrorTypeInfo";

export class KeyValue implements Exp {

    id: Exp;
    exp: Exp;

    constructor(id: Exp, exp: Exp) {
        this.id = id;
        this.exp = exp;
    }

    toString(): string {
        return `KeyValue(${this.id}, ${this.exp.toString()})`;
    }

    unParse(): string {
        return `${this.id} : ${this.exp.unParse()}`;
    }

    evaluate(state: State): any {
        let identifier = id.evaluate(state);
        if (typeof identifier === 'string') {
            let keyValue= new Map();
            keyValue.set('key',identifier);
            keyValue.set('value',this.exp.evaluate(state));
            return keyValue;
        }
        let error: [ErrorTypeInfo] = [new ErrorTypeInfo("exp", identifier)];
        throw new EvalError(`\n######## ERROR DE TIPOS ########\n${error.join("\n") }\n################################`);
    }
}
