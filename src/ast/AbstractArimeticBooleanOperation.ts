import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { AbstractGenericComparation } from './AbstractGenericComparation'

export  abstract class AbstractArimeticBooleanOperation extends AbstractGenericComparation {

  protected constructor(leftHandSide: Exp, rightHandSide: Exp, operationSymbol: string, comparatorFunction: Function) {
    super(leftHandSide, rightHandSide, operationSymbol,comparatorFunction);
  }

  protected evaluation(leftSideEvaluation: any, rightSideEvaluation: any):any {
    return this.evaluateComparation(leftSideEvaluation,rightSideEvaluation);
  }

}
