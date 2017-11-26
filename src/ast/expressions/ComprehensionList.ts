import {Exp} from '../ASTNode';
import {State} from '../../interpreter/State';
import {ListCollection} from '../AST';
import {AbstractComprehension} from "./abstract/AbstractComprehension";

export class ComprehensionList extends AbstractComprehension {

    constructor(forBody: Exp, expList: [Exp]) {
        super(forBody, expList);
    }

    evaluate(state: State): any {
        let comprehensionResult=this.comprehensionEvaluation(state);
        return comprehensionResult;
    }
}
