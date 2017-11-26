import {Exp} from '../ASTNode';
import {KeyValue} from '../AST';
import {State} from '../../interpreter/State';
import {AbstractCollection} from "./abstract/AbstractCollection";

export class SetCollection extends AbstractCollection {

    arr: Array<any>;

    constructor(arr?: Array<any>) {
        super([...new Set(arr)]);
    }

    unParse(): string {
        let collectionUnParsing = this.collectionUnParsing();
        return `{${collectionUnParsing}}`;
    }

    evaluate(state: State): any {
        let collectionEvaluation = this.createSet(state);
        return collectionEvaluation;
    }
}
