import {Exp} from '../ASTNode';
import {ListCollection, SetCollection} from '../AST';
import {State} from '../../interpreter/State';
import {AbstractBinaryExpression} from "./abstract/AbstractBinaryExpression";

export class Union extends AbstractBinaryExpression {

    constructor(leftHandSide: Exp, rightHandSide: Exp) {
        super(leftHandSide, rightHandSide, "\\/");
    }

    evaluate(state: State): any {
        let leftHandSideEvaluation = this.leftHandSideEvaluation(state);
        let rightHandSideEvaluation = this.rightHandSideEvaluation(state);
        if (this.isString(leftHandSideEvaluation)) leftHandSideEvaluation = new ListCollection(leftHandSideEvaluation.split(""));
        if (this.isString(rightHandSideEvaluation)) rightHandSideEvaluation = new ListCollection(rightHandSideEvaluation.split(""));
        if(this.isCollection(leftHandSideEvaluation)&& this.isCollection(rightHandSideEvaluation)){
          if(this.isList(leftHandSideEvaluation) || this.isList(rightHandSideEvaluation)){
            return this.createSet(leftHandSideEvaluation,rightHandSideEvaluation);
          }
          return new Set(this.createSet(leftHandSideEvaluation,rightHandSideEvaluation));
        }
        this.ThrowEvaluationException(rightHandSideEvaluation, leftHandSideEvaluation);
    }

    private createSet(leftHandSideEvaluation: any, rightHandSideEvaluation: any) {
        return [...new Set([...leftHandSideEvaluation, ...rightHandSideEvaluation])];
    }
}
