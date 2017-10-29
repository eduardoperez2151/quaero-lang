import {Null} from './Null';
import {Exp} from '../ASTNode';
import {Function} from '../statements/Function';
import {State} from '../../interpreter/State';

export class CallFunction implements Exp {

    identifier: string;
    params: [Exp];

    constructor(identifier: string, params: [Exp]) {
        this.identifier = identifier;
        this.params = params;
    }

    toString(): string {
        return `CallFunction(${this.identifier} , ${this.params.toString()})`;
    }

    unParse(): string {
        let params = this.params.map(param=> param.unParse()).join(",");
        return `function ${this.identifier} (${params}) `;
    }

    evaluate(state: State): any {
        let func: Function = state.get(this.identifier);
        let functionState = state.clone();
        let functionArguments = func.args;
        this.params.forEach((parameter, index) => functionState.set(functionArguments[index], parameter.evaluate(functionState)));
        let returnValue = func.body.evaluate(functionState).get("Return");
        return returnValue ? returnValue : null;
    }
}
