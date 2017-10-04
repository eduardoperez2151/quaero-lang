import { Exp } from './ASTNode';
import { ListCollection } from './AST';
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
/*
  protected evaluateList(leftEvaluation: any, rightEvaluation: any): boolean {
    return this.isList(leftEvaluation) && this.isList(rightEvaluation)
      ? this.compareList(leftEvaluation, rightEvaluation)
      : null;
  }
  */
  evaluate(state: State): any {
    var leftSideEvaluation = this.leftHandSideEvaluation(state);
    var rightHandSideEvaluation = this.rightHandSideEvaluation(state);
    var evaluation= this.evaluation(leftSideEvaluation, rightHandSideEvaluation);
    if (evaluation!=null){
      return evaluation;
    }
    this.ThrowEvaluationException(leftSideEvaluation,rightHandSideEvaluation);
  }
/*
  compareList(leftHandSide: Exp, rightHandSide: Exp):boolean{
    var array1 = (leftHandSide as ListCollection).arr;
    var array2 = (leftHandSide as ListCollection).arr;

    var is_same = (array1.length == array2.length) && array1.every(function(element, index) {
        return element === array2[index];
    });
    return is_same;
  }
  */
  protected abstract evaluation(leftSideEvaluation, rightHandSideEvaluation):any;
}
