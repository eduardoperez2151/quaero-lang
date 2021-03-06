import {State} from '../../interpreter/State';
import {AbstractCollection} from "./abstract/AbstractCollection";

export class ListCollection extends AbstractCollection {

    arr: Array<any>;

    constructor(arr?: Array<any>) {
        super(arr);
    }

    unParse(): string {
       let collectionUnParsing=this.collectionUnParsing();
        return `[${collectionUnParsing}]`;
    }

    evaluate(state: State): any {
        let collectionEvaluation = this.createList(state);
        return collectionEvaluation;
    }
}
