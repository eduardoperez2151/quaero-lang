import {Exp} from '../ASTNode';
import {State} from '../../interpreter/State';
import {SetCollection} from '.././AST';
import {AbstractBinaryExpression} from './AbstractBinaryExpression'

export abstract class AbstractGenericComparator extends AbstractBinaryExpression {

    comparatorFunction: Function;

    protected constructor(leftHandSide: Exp, rightHandSide: Exp, operationSymbol: string, comparatorFunction: Function) {
        super(leftHandSide, rightHandSide, operationSymbol);
        this.comparatorFunction = comparatorFunction;
    }

    protected evaluateComparation(leftEvaluation: any, rightEvaluation: any): boolean {
        let isBooleanEvaluation = this.isBoolean(leftEvaluation) && this.isBoolean(rightEvaluation);
        let isNumberEvaluation = this.isNumber(leftEvaluation) && this.isNumber(rightEvaluation);
        let isStringEvaluation = this.isString(leftEvaluation) && this.isString(rightEvaluation);
        let isListEvaluation = this.isList(leftEvaluation) && this.isList(rightEvaluation);
        let isSet = this.isSet(leftEvaluation) && this.isSet(rightEvaluation);
        if (isListEvaluation) {
            let processedLeftArray = leftEvaluation.processItems();
            let processedRightArray = rightEvaluation.processItems();
            return this.compareList(this.operationSymbol, this.comparatorFunction, processedLeftArray, processedRightArray);
        }
        if (isSet){
          return this.compareSet(this.operationSymbol, leftEvaluation, rightEvaluation );
        }
        return (isBooleanEvaluation || isNumberEvaluation || isStringEvaluation) ? this.comparatorFunction.call(this, leftEvaluation, rightEvaluation) : null;
    }

    private compareList(symbolOperation: string, comparatorFunction: Function, leftArray: Array<any>, rightArray: Array<any>): boolean {
        let checkLength = comparatorFunction.call(this, leftArray.length, rightArray.length);
        switch (symbolOperation) {
            case "==":
                return checkLength && leftArray.every(function (element, index) {
                    return comparatorFunction.call(this, element, rightArray[index]);
                });
            case "/=":
                return checkLength || leftArray.some(function (element, index) {
                    return comparatorFunction.call(this, element, rightArray[index]);
                });
            default:
                return comparatorFunction.call(this, leftArray, rightArray);
        }
    }
    private compareSet(symbolOperation: string, leftEvaluation: SetCollection, rigthEvaluation: SetCollection): boolean {

      var funcIncluded = function ():boolean{
            var result = leftEvaluation.arr.filter((item) => rigthEvaluation.has(item));
            return result.length == leftEvaluation.arr.length;
      }
      var funcInclude = function ():boolean{
            var result = rigthEvaluation.arr.filter((item) => leftEvaluation.has(item));
            return result.length == rigthEvaluation.arr.length;
      }

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

    protected abstract evaluation(leftSideEvaluation, rightHandSideEvaluation): any;
}
