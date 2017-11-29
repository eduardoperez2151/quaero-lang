import {Exp} from '../../ASTNode';
import {State} from '../../../interpreter/State';
import {AbstractBinaryExpression} from '../abstract/AbstractBinaryExpression'
var _ = require("underscore");
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
        //return (isBooleanEvaluation || isNumberEvaluation || isStringEvaluation) ? this.comparatorFunction.call(this, leftEvaluation, rightEvaluation) : null;
        return (isBooleanEvaluation || isNumberEvaluation || isStringEvaluation) ? this.comparatorFunction.call(this, leftEvaluation, rightEvaluation) : false;
    }
        private compareList(symbolOperation: string, comparatorFunction: Function, leftArray: Array<any>, rightArray: Array<any>): boolean {
        //let checkLength = comparatorFunction.call(this, leftArray.length, rightArray.length);
        let checkLength = leftArray.length == rightArray.length;
        //return this.compare(symbolOperation, comparatorFunction, leftArray,rightArray);
        let comparison = this.compare(symbolOperation, comparatorFunction, leftArray,rightArray);
        switch (symbolOperation) {
            case "==":
              return checkLength && comparison;
            case "/=":
                return ! checkLength || ! comparison;
            case "<":
                return comparison || (checkLength ? false : this.compare("==", (a,b) => a == b, leftArray,rightArray));
            case ">":
                return comparison;
            case ">=":
                //return comparison && (checkLength ? true : ! this.compare("==", (a,b) => a == b, leftArray,rightArray));
            default:
                var symbols_bool = symbolOperation == "<=" || symbolOperation == ">=" || symbolOperation == ">";
                return symbols_bool ? comparison : false;
        }
    }
    private compareList2(symbolOperation: string, comparatorFunction: Function, leftArray: Array<any>, rightArray: Array<any>): boolean {
        let checkLength = comparatorFunction.call(this, leftArray.length, rightArray.length);
        switch (symbolOperation) {
            case "==":
                return checkLength && leftArray.every((value,index) => _.isEqual(value,rightArray[index]));
            case "/=":
                return checkLength || leftArray.some((value,index) => !(_.isEqual(value,rightArray[index])));
            default: //Falla en [-1]>[-2] ya que javascript en array compara pasandolos a string, ahora si en la lista parecen sets que se deberia hacer ya que por < o > serian incluciones
              return comparatorFunction.call(this, leftArray, rightArray);
        }
    }
    private compareSet(symbolOperation: string, leftEvaluation, rigthEvaluation, funct): boolean {
        let funcIncluded = function (): boolean {
          let result = [...leftEvaluation].filter((item) => {
            if((item instanceof Array || item instanceof Set)){
              let rightArray = [...rigthEvaluation];
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
    private compareEquals(leftArray: Array<any>, rightArray: Array<any>): boolean {
      return this.compare("==", (a,b) => a == b, leftArray, rightArray);
    }
    private compareLess(leftArray: Array<any>, rightArray: Array<any>): boolean {
      return this.compare("<", (a,b) => a < b, leftArray, rightArray);
    }

    private compare(symbolOperation: string, comparatorFunction: Function, leftArray: Array<any>, rightArray: Array<any>): boolean {
      function rec(element, index) {
          if (typeof rightArray[index] === "undefined") return true;
          var arrayType = rightArray[index] instanceof Array && element instanceof Array;
          var arraySet  = rightArray[index] instanceof Set && element instanceof Set;
          if (arrayType || arraySet){
            return new GenericBinaryOperation(element, rightArray[index], symbolOperation, comparatorFunction).preEval();
          }
          return comparatorFunction.call(this, element, rightArray[index]);
        }
      var symbol_equal_less_bigger = symbolOperation == "==" || symbolOperation == "<=" || symbolOperation == ">=";
      return symbol_equal_less_bigger ? leftArray.every(rec) : leftArray.some(rec) ;
    }

}
