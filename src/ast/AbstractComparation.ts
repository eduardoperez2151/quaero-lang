import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { AbstractBinaryExpression } from './AbstractBinaryExpression'

export class AbstractComparation extends AbstractBinaryExpression {

  comparatorFunction: Function

  constructor(leftHandSide: Exp, rightHandSide: Exp, operationSymbol: string, comparatorFunction: Function) {
    super(leftHandSide, rightHandSide, operationSymbol);
    this.comparatorFunction = comparatorFunction;
  }

  evaluate(state: State): any {
    var leftSideEvaluation = this.leftHandSideEvaluation(state);
    var rightHandSideEvaluation = this.rightHandSideEvaluation(state);

    if (this.isBoolean(leftSideEvaluation) && this.isBoolean(leftSideEvaluation)) {
      console.log("fsdjfjsdkf");
      return this.comparatorFunction.call(this, leftSideEvaluation, rightHandSideEvaluation);
    }

    if (this.isNumber(leftSideEvaluation) && this.isNumber(leftSideEvaluation)) {
      return this.comparatorFunction.call(this, leftSideEvaluation, rightHandSideEvaluation);
    }
    this.ThrowEvaluationException(leftSideEvaluation, rightHandSideEvaluation);
  }
}
