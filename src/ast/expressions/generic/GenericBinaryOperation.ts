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
          var comparison, compareLess, compareEquals = false;
          if (symbolOperation == "==" ||  symbolOperation == "<"){
             comparison = this.compare(symbolOperation, comparatorFunction, leftArray,rightArray);
             return comparison;
          }else{
            compareLess = this.compare("<", (a,b) => a < b, leftArray, rightArray);
            compareEquals = this.compare("==", (a,b) => a == b, leftArray, rightArray);
          }
          switch (symbolOperation) {
              case "/=":
                  return ! compareEquals;
              case ">":
                  return ! compareLess && ! compareEquals;
              case ">=":
                  return ! compareLess;
              case "<=":
                  return compareLess || compareEquals ;
              default:
                  return false;
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

    private compare(symbolOperation: string, comparatorFunction: Function, leftArray: Array<any>, rightArray: Array<any>): boolean {
      var exit  = false;
      var result = false;
      function compareAux(element, index) {
        if (! exit){
          var arrayType = rightArray[index] instanceof Array && element instanceof Array;
          var arraySet  = rightArray[index] instanceof Set && element instanceof Set;
          if (arrayType || arraySet){
            return new GenericBinaryOperation(element, rightArray[index], symbolOperation, comparatorFunction).preEval();
          }
          if (symbolOperation == "<" && element != rightArray[index]){
            exit = true;
          }
          result = comparatorFunction.call(this, element, rightArray[index]);
          return result;
        }
      }
      var symbolEquals = symbolOperation == "==";
      if (symbolEquals){
        leftArray.every(compareAux);
      }else{
        leftArray.some(compareAux);
      }
      return symbolEquals ?
        this.compareEquals(leftArray, rightArray, result) :
        this.compareLess(leftArray, rightArray, result);
    }

    private compareEquals(leftArray: Array<any>, rightArray: Array<any>, comparison:boolean): boolean{
      var checkLength = leftArray.length == rightArray.length;
      if (checkLength && leftArray.length == 0) return true;
      return checkLength && comparison;
    }
    private compareLess(leftArray: Array<any>, rightArray: Array<any>, comparison:boolean): boolean{
      var checkLess = leftArray.length < rightArray.length;
      return this.compareAux("==", (a,b) => a == b, leftArray, rightArray) ? checkLess : comparison ;
    }

    private compareAux(symbolOperation: string, comparatorFunction: Function, leftArray: Array<any>, rightArray: Array<any>): boolean {
      function compareAux(element, index) {
          var arrayType = rightArray[index] instanceof Array && element instanceof Array;
          var arraySet  = rightArray[index] instanceof Set && element instanceof Set;
          if (arrayType || arraySet){
            return new GenericBinaryOperation(element, rightArray[index], symbolOperation, comparatorFunction).preEval();
          }
          return comparatorFunction.call(this, element, rightArray[index]);
      }
      return leftArray.every(compareAux);
    }

}
