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
        if(!isNumberEvaluation && ['+',"-",'/','*'].indexOf(this.operationSymbol)>-1){
            return null;
        }
        if(!isBooleanEvaluation && (this.operationSymbol == '||' || this.operationSymbol == '&&')){
            return null;
        }
        let isStringEvaluation = this.isString(leftEvaluation) && this.isString(rightEvaluation);
        let isListEvaluation = this.isList(leftEvaluation) && this.isList(rightEvaluation);
        let isSet = this.isSet(leftEvaluation) && this.isSet(rightEvaluation);
        if (typeof rightEvaluation === "number" && isNaN(leftEvaluation) || typeof leftEvaluation === "number" && isNaN(rightEvaluation)) return false;
        if (isListEvaluation) {
            return this.compareList2(this.operationSymbol,leftEvaluation, rightEvaluation);
        }
        if (isSet){
          return this.compareSet2(this.operationSymbol, leftEvaluation, rightEvaluation);
        }

        return (isBooleanEvaluation || isNumberEvaluation || isStringEvaluation) ? this.comparatorFunction.call(this, leftEvaluation, rightEvaluation) : this.operationSymbol === '==' || this.operationSymbol === '/=' ? false : null;
    }


    private compareList2(symbolOperation: string, leftEvaluation, rigthEvaluation){
      if(!AbstractBinaryExpression.isGreaterEqual(leftEvaluation,rigthEvaluation) && !AbstractBinaryExpression.islesserEqual(leftEvaluation,rigthEvaluation)){return false;}
      if(symbolOperation == '=='){
        return AbstractBinaryExpression.theCakeIsALie(leftEvaluation,rigthEvaluation);
      }
      if(symbolOperation == '/='){
        return ! AbstractBinaryExpression.theCakeIsALie(leftEvaluation,rigthEvaluation);
      }
      if(symbolOperation == '<'){
        return ! AbstractBinaryExpression.isGreaterEqual(leftEvaluation,rigthEvaluation);
      }
      if(symbolOperation == '<='){
        return  AbstractBinaryExpression.islesserEqual(leftEvaluation,rigthEvaluation);
      }
      if(symbolOperation == '>'){
        return ! AbstractBinaryExpression.islesserEqual(leftEvaluation,rigthEvaluation);
      }
      if(symbolOperation == '>='){
        return AbstractBinaryExpression.isGreaterEqual(leftEvaluation,rigthEvaluation);
      }
    }
    private compareSet2(symbolOperation:string,leftEvaluation,rightEvaluation){
      let funcIncluded = function(): boolean{
        let aIncludedInB = [...leftEvaluation].every(leftItem =>[...rightEvaluation].some(rightItem => AbstractBinaryExpression.theCakeIsALie(leftItem,rightItem)));
        let aIncludedInBKeys = [...leftEvaluation["keyValues"].keys()].every(
          leftItem =>[...leftEvaluation["keyValues"].keys()].some(rightItem => AbstractBinaryExpression.theCakeIsALie(leftItem,rightItem)));
        return aIncludedInB && aIncludedInBKeys;
      }
      let funcInclude = function(): boolean{
        let aIncludesB = [...rightEvaluation].every(rightItem =>[...leftEvaluation].some(leftItem => AbstractBinaryExpression.theCakeIsALie(rightItem,leftItem)));
        let aIncludesBKeys = [...rightEvaluation["keyValues"].keys()].every(
          rightItem =>[...leftEvaluation["keyValues"].keys()].some(leftItem => AbstractBinaryExpression.theCakeIsALie(rightItem,leftItem)))
        return aIncludesB && aIncludesBKeys;
      }
      switch (symbolOperation) {
        case "<":
          return funcIncluded.call(this);
        case ">":
          return funcInclude.call(this);
        case "==":
          return funcInclude.call(this) && funcIncluded.call(this);
        case "/=":
          return !((funcInclude.call(this) && funcIncluded.call(this)));
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

}
