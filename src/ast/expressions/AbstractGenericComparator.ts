import {Exp} from '../ASTNode';
import {State} from '../../interpreter/State';
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
        if (isListEvaluation) {// Al tener objetos KeyValue usamos nuestros comparadores.
            let processedLeftArray = leftEvaluation.processItems();
            let processedRightArray = rightEvaluation.processItems();
            return this.compareList(this.operationSymbol, this.comparatorFunction, processedLeftArray, processedRightArray);
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
