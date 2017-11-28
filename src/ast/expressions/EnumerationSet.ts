import {Exp} from '../ASTNode';
import {SetCollection} from '../AST';
import {State} from '../../interpreter/State';
import {AbstractEnumerationCollection} from "./abstract/AbstractEnumerationCollection";

export class EnumerationSet extends AbstractEnumerationCollection {


    constructor(first: Exp, end: Exp, second?: Exp) {
        super(first, end, second);
    }

    unParse(): string {
        return `[${this.enumerationUnParsing()}]`;
    }

    evaluate(state: State): any {
        let enumerationCalculate = this.enumerationCalculate(state);
        let result = new Set(enumerationCalculate);
        result["keyValues"] = new Map();
        return result;
    }
}
