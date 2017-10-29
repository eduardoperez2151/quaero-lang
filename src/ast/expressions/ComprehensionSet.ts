import {Exp} from '../ASTNode';
import {State} from '../../interpreter/State';
import {AbstractComprehension} from "./AbstractComprehension";
import {SetCollection} from "./SetCollection";

export class ComprehensionSet extends AbstractComprehension {

    constructor(forBody: Exp, expList: [Exp]) {
        super(forBody, expList);
    }

    evaluate(state: State): any {
        let comprehensionResult = this.comprehensionEvaluation(state);
        return new SetCollection(comprehensionResult);
    }
}