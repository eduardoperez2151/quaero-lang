import { Exp } from './ASTNode';
import { ListCollection, KeyValue } from './AST';
import { State } from '../interpreter/State';
import { AbstractBinaryExpression } from './AbstractBinaryExpression'

export abstract class AbstractGenericComparation extends AbstractBinaryExpression {

  comparatorFunction: Function

  protected constructor(leftHandSide: Exp, rightHandSide: Exp, operationSymbol: string, comparatorFunction: Function) {
    super(leftHandSide, rightHandSide, operationSymbol);
    this.comparatorFunction = comparatorFunction;
  }

  protected evaluateComparation(leftEvaluation: any, rightEvaluation: any): boolean {
    var is_Boolean = this.isBoolean(leftEvaluation) && this.isBoolean(rightEvaluation);
    var is_Number  = this.isNumber(leftEvaluation) && this.isNumber(rightEvaluation)
    var is_String  = this.isString(leftEvaluation) && this.isString(rightEvaluation);
    var is_List    = this.isList(leftEvaluation) && this.isList(rightEvaluation);
    if (is_List){// Al tener objetos KeyValue usamos nuestros comparadores.
      var array1: Array<any> = leftEvaluation.processItems();
      var array2: Array<any> = rightEvaluation.processItems();
      return this.compareList(this.operationSymbol, this.comparatorFunction, array1, array2);
    }
    return (is_Boolean || is_Number || is_String)
      ? this.comparatorFunction.call(this, leftEvaluation, rightEvaluation)
      : null;
  }
  protected evaluateList(leftEvaluation: any, rightEvaluation: any): boolean {
    return this.isList(leftEvaluation) && this.isList(rightEvaluation)
      ? this.comparatorFunction(this,(leftEvaluation as ListCollection).arr,(rightEvaluation as ListCollection).arr)
      :null;
  }

  evaluate(state: State): any {
    var leftSideEvaluation = this.leftHandSideEvaluation(state);
    var rightHandSideEvaluation = this.rightHandSideEvaluation(state);
    var evaluation= this.evaluation(leftSideEvaluation, rightHandSideEvaluation);
    if (evaluation!=null){
      return evaluation;
    }
    this.ThrowEvaluationException(leftSideEvaluation,rightHandSideEvaluation);
  }

  compareList(symbol:string,func: Function, array1: Array<any>, array2: Array<any>):boolean{
    var checkLength = func.call(this,array1.length, array2.length);
    switch(symbol){
      case "==":
          return checkLength && array1.every(function(element, index) {
              return func.call(this, element, array2[index]);
          });
      case "/=":
          return checkLength || array1.some(function(element, index) {
              return func.call(this, element,array2[index]);
          });
      default:
        return func.call(this, array1, array2);
    }
  }

  protected abstract evaluation(leftSideEvaluation, rightHandSideEvaluation):any;
}
