import {Exp} from '../ASTNode';
import {ListCollection} from '../AST';
import {State} from '../../interpreter/State';
import {AbstractEnumerationCollection} from "./abstract/AbstractEnumerationCollection";


export class EnumerationList extends AbstractEnumerationCollection {


    constructor(first: Exp, end: Exp, second?: Exp) {
        super(first, end, second);
    }

    unParse(): string {
        return `[${this.enumerationUnParsing()}]`;
    }

    evaluate(state: State): any {
        let enumerationCalculate = this.enumerationCalculate(state);
        return enumerationCalculate;
    }
}
