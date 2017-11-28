import {Exp} from '../../ASTNode';
import {State} from '../../../interpreter/State';
import {AbstractBinaryExpression} from '../abstract/AbstractBinaryExpression'

export class GenericBinaryOperation extends AbstractBinaryExpression {

    comparatorFunction: Function;

    constructor(leftHandSide, rightHandSide, operationSymbol: string, comparatorFunction: Function) {
        super(leftHandSide, rightHandSide, operationSymbol);
        this.comparatorFunction = comparatorFunction;
    }

    protected evaluateComparation(leftEvaluation: any, rightEvaluation: any): boolean {
        let isBooleanEvaluation = this.isBoolean(leftEvaluation) && this.isBoolean(rightEvaluation);
        let isNumberEvaluation = this.isNumber(leftEvaluation) && this.isNumber(rightEvaluation);
        let isStringEvaluation = this.isString(leftEvaluation) && this.isString(rightEvaluation);
        let isListEvaluation = this.isList(leftEvaluation) && this.isList(rightEvaluation);
        let isSet = this.isSet(leftEvaluation) && this.isSet(rightEvaluation);
        if(typeof leftEvaluation ==="number" && isNaN(leftEvaluation) || typeof rightEvaluation ==="number" && isNaN(rightEvaluation)) return false;
        if (isListEvaluation) {
            return this.compareList(this.operationSymbol, this.comparatorFunction, leftEvaluation, rightEvaluation);
        }
        if (isSet){
          return this.compareSet(this.operationSymbol, leftEvaluation, rightEvaluation,this.comparatorFunction );
        }
        return (isBooleanEvaluation || isNumberEvaluation || isStringEvaluation) ? this.comparatorFunction.call(this, leftEvaluation, rightEvaluation) : null;
    }
    private compareList(symbolOperation: string, comparatorFunction: Function, leftArray: Array<any>, rightArray: Array<any>): boolean {
        let checkLength = comparatorFunction.call(this, leftArray.length, rightArray.length);
        switch (symbolOperation) {
            case "==":
                return checkLength && leftArray.every(function rec(element, index) {
                    if((rightArray[index] instanceof Array || rightArray[index] instanceof Set)){
                      if(element instanceof Array || element instanceof Set){
                        return new GenericBinaryOperation(element, rightArray[index], symbolOperation, comparatorFunction).preEval();
                      }else return false;
                    }
                    else if(element instanceof Array || element instanceof Set) return false;
                    else{
                      return comparatorFunction.call(this, element, rightArray[index]);
                    }
                });
            case "/=":
                return checkLength || leftArray.some(function rec(element, index) {
                  if((element instanceof Array || element instanceof Set) && (rightArray[index] instanceof Array || rightArray[index] instanceof Set)){
                    return new GenericBinaryOperation(element, rightArray[index], symbolOperation, comparatorFunction).preEval();
                  }
                  return comparatorFunction.call(this, element, rightArray[index]);
                });
            default: //Falla en [-1]>[-2] ya que javascript en array compara pasandolos a string, ahora si en la lista parecen sets que se deberia hacer ya que por < o > serian incluciones
              return comparatorFunction.call(this, leftArray, rightArray);
        }
    }
    private compareSet(symbolOperation: string, leftEvaluation, rigthEvaluation, funct): boolean {

        let funcIncluded = function (): boolean {
          let result = [...leftEvaluation].filter((item) => {
            if((item instanceof Array || item instanceof Set)){
              let rightArray = [...rigthEvaluation];1
              let rightValue;
              for (let i=0;i<rightArray.length;i++){
                rightValue = rightArray[i];
                if(rightValue instanceof Array || rightValue instanceof Set){
                  return new GenericBinaryOperation(item, rightValue, "==" , (a, b) => a == b).preEval();
                }else return false;
              }
            }
            //else if(item instanceof Array || item instanceof Set) return false;
            else{
                return rigthEvaluation.has(item);
            }
          });
            let b = result.length <= leftEvaluation.size;
            return result.length <= leftEvaluation.size;
        };
        let funcInclude = function (): boolean {
            let result = [...rigthEvaluation].filter((item) => {
              if((item instanceof Array || item instanceof Set)){
                let leftArray = [...leftEvaluation];1
                let leftValue;
                for (let i=0;i<leftArray.length;i++){
                  leftValue = leftArray[i];
                  if(leftValue instanceof Array || leftValue instanceof Set){
                    return new GenericBinaryOperation(item, leftValue, "==" , (a, b) => a == b).preEval();
                  }else return false;
                }
              }
              //else if(item instanceof Array || item instanceof Set) return false;
              else{
                  return leftEvaluation.has(item);
              }
            });
            let b = result.length >= rigthEvaluation.size;
            return result.length >= rigthEvaluation.size;
        };

        switch (symbolOperation) {
          case "<":
            return funcIncluded.call(this);
          case ">":
            return funcInclude.call(this);
          case "==":
            return funcInclude.call(this) && funcIncluded.call(this);
          default:
            console.log("La función [" + symbolOperation + "] no está definida para los conjuntos.");
            return false;
        }
    }

    evaluate(state: State): any {
        let leftSideEvaluation = this.leftHandSideEvaluation(state);
        let rightHandSideEvaluation = this.rightHandSideEvaluation(state);
        let evaluation = this.evaluation(leftSideEvaluation, rightHandSideEvaluation);
        if (evaluation != null) {
            return evaluation;
        }
        this.ThrowEvaluationException(leftSideEvaluation, rightHandSideEvaluation);
    }

    protected evaluation(leftSideEvaluation: any, rightHandSideEvaluation: any): any {
        return this.evaluateComparation(leftSideEvaluation, rightHandSideEvaluation);
    }
    preEval(){
      return this.evaluateComparation(this.leftHandSide,this.rightHandSide)
    }
}
