import {Exp} from '../ASTNode';
import {State} from '../../interpreter/State';
import {AbstractComprehension} from "./abstract/AbstractComprehension";
import {SetCollection} from "./SetCollection";

export class ComprehensionSet extends AbstractComprehension {

    constructor(forBody: Exp, expList: [Exp]) {
        super(forBody, expList);
    }

    evaluate(state: State): any {
        let comprehensionResult = this.comprehensionEvaluation(state);
        let result = new Set(comprehensionResult);
        result["keyValues"] = new Map();
        return comprehensionResult;
    }
}
