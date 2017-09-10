import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { AbstractBinaryExpression } from './AbstractBinaryExpression'

export class CompareLess extends AbstractBinaryExpression {
  
    constructor(leftHandSide: Exp, rightHandSide: Exp) {
      super(leftHandSide, rightHandSide, "<");
    }
  
    evaluate(state: State): any {
      var leftSideEvaluation = this.leftHandSideEvaluation(state);
      var rightHandSideEvaluation = this.rightHandSideEvaluation(state);
  
      if (this.isBoolean(leftSideEvaluation) && this.isBoolean(leftSideEvaluation)) {
        return leftSideEvaluation < rightHandSideEvaluation;
      }
  
      if (this.isNumber(leftSideEvaluation) && this.isNumber(leftSideEvaluation)) {
        return leftSideEvaluation < rightHandSideEvaluation;
      }
      this.ThrowEvaluationException(leftSideEvaluation, rightHandSideEvaluation);
    }
}
