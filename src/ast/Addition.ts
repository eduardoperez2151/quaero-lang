import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { AbstractBinaryExpression } from './AbstractBinaryExpression'

export class Addition extends AbstractBinaryExpression {

  constructor(leftHandSide: Exp, rightHandSide: Exp) {
    super(leftHandSide, rightHandSide, "+");
  }

  evaluate(state: State): any {
    var leftSideEvaluation = this.leftHandSideEvaluation(state);
    var rightHandSideEvaluation = this.rightHandSideEvaluation(state);
    return leftSideEvaluation + rightHandSideEvaluation;
  }
}
