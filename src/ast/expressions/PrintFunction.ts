import {Exp} from '../ASTNode';
import {State} from '../../interpreter/State';

export class PrintFunction implements Exp {

    exp: Exp;

    constructor(exp: Exp) {
        this.exp = exp;
    }

    toString(): string {
        return `PrintFunction(${this.exp})`;
    }

    unParse(): string {
        return `PrintFunction(${this.exp})`;
    }

    evaluate(state: State): any {
        console.log(this.exp.evaluate(state));
    }
}
