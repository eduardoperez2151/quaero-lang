import {Exp} from '../../ASTNode';
import {AbstractGenericComparator} from '../abstract/AbstractGenericComparator'

export  class GenericArithmeticBooleanOperation extends AbstractGenericComparator {

    public constructor(leftHandSide: Exp, rightHandSide: Exp, operationSymbol: string, comparatorFunction: Function) {
        super(leftHandSide, rightHandSide, operationSymbol, comparatorFunction);
    }

    protected evaluation(leftSideEvaluation: any, rightSideEvaluation: any): any {
        return this.evaluateComparation(leftSideEvaluation, rightSideEvaluation);
    }

}
