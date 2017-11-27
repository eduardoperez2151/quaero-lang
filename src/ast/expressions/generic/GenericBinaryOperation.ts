import {Exp} from '../../ASTNode';
import {State} from '../../../interpreter/State';
import {AbstractBinaryExpression} from '../abstract/AbstractBinaryExpression'

export class GenericBinaryOperation extends AbstractBinaryExpression {

    comparatorFunction: Function;

    constructor(leftHandSide: Exp, rightHandSide: Exp, operationSymbol: string, comparatorFunction: Function) {
        super(leftHandSide, rightHandSide, operationSymbol);
        this.comparatorFunction = comparatorFunction;
    }

    protected evaluateComparation(leftEvaluation: any, rightEvaluation: any): boolean {
        let isBooleanEvaluation = this.isBoolean(leftEvaluation) && this.isBoolean(rightEvaluation);
        let isNumberEvaluation = this.isNumber(leftEvaluation) && this.isNumber(rightEvaluation);
        let isStringEvaluation = this.isString(leftEvaluation) && this.isString(rightEvaluation);
        let isListEvaluation = this.isList(leftEvaluation) && this.isList(rightEvaluation);
        let isSet = this.isSet(leftEvaluation) && this.isSet(rightEvaluation);
        if(isNaN(leftEvaluation) || isNaN(rightEvaluation)){return false;}
        if (isListEvaluation) {
            return this.compareList(this.operationSymbol, this.comparatorFunction, leftEvaluation, rightEvaluation);
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
                return checkLength && leftArray.every(function rec(element, index) {
                    return comparatorFunction.call(this, element, rightArray[index]);
                });
            case "/=":
                return checkLength || leftArray.some(function rec(element, index) {
                    return comparatorFunction.call(this, element, rightArray[index]);
                });
            default:
                return comparatorFunction.call(this, leftArray, rightArray);
        }
    }
    private compareSet(symbolOperation: string, leftEvaluation, rigthEvaluation): boolean {

        let funcIncluded = function (): boolean {
            let result = [...leftEvaluation].filter((item) => rigthEvaluation.has(item));
            console.log(result);
            return result.length <= leftEvaluation.size;
        };
        let funcInclude = function (): boolean {
            let result = [...rigthEvaluation].filter((item) => leftEvaluation.has(item));
            console.log(result);
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
}
