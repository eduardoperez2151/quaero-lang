import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { AbstractGenericComparation } from './AbstractGenericComparation'

export  abstract class AbstractArimeticBooleanOperation extends AbstractGenericComparation {

  protected constructor(leftHandSide: Exp, rightHandSide: Exp, operationSymbol: string, comparatorFunction: Function) {
    super(leftHandSide, rightHandSide, operationSymbol,comparatorFunction);
  }

  protected evaluation(leftSideEvaluation: any, rightHandSideEvaluation: any) {
    var booleanEvaluation=this.evaluateBoolean(leftSideEvaluation,rightHandSideEvaluation);
    if(booleanEvaluation==null){
      var arimeticEvaluation=this.evaluateNumber(leftSideEvaluation,rightHandSideEvaluation);
      if(arimeticEvaluation==null){
        this.ThrowEvaluationException(leftSideEvaluation,rightHandSideEvaluation);
      }else{
        return arimeticEvaluation;
      }
    }else{
      return booleanEvaluation;
    } 
  }

}
