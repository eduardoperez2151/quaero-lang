import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { AbstractBinaryExpression } from './AbstractBinaryExpression'

export abstract class AbstractGenericComparation extends AbstractBinaryExpression {

  comparatorFunction: Function

  protected constructor(leftHandSide: Exp, rightHandSide: Exp, operationSymbol: string, comparatorFunction: Function) {
    super(leftHandSide, rightHandSide, operationSymbol);
    this.comparatorFunction = comparatorFunction;
  }

  protected evaluateBoolean(leftEvaluation: any, rightEvaluation: any): boolean {
    return this.isBoolean(leftEvaluation) && this.isBoolean(rightEvaluation)
      ? this.comparatorFunction.call(this, leftEvaluation, rightEvaluation)
      : null;
  }

  protected evaluateNumber(leftEvaluation: any, rightEvaluation: any): boolean {
    return this.isNumber(leftEvaluation) && this.isNumber(rightEvaluation)
      ? this.comparatorFunction.call(this, leftEvaluation, rightEvaluation)
      : null;
  }

  evaluate(state: State): any {
    var leftSideEvaluation = this.leftHandSideEvaluation(state);
    var rightHandSideEvaluation = this.rightHandSideEvaluation(state);
    return this.evaluation(leftSideEvaluation, rightHandSideEvaluation);
  }

  protected abstract evaluation(leftSideEvaluation, rightHandSideEvaluation);
}
