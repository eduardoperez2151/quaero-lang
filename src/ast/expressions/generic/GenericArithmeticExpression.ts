import {Exp} from '../../ASTNode';
import {AbstractGenericComparator} from '../abstract/AbstractGenericComparator'

export class GenericArithmeticExpression extends AbstractGenericComparator {

    public constructor(leftHandSide: Exp, rightHandSide: Exp, operationSymbol: string, comparatorFunction: Function) {
        super(leftHandSide, rightHandSide, operationSymbol, comparatorFunction);
    }

    protected evaluation(leftSideEvaluation: any, rightHandSideEvaluation: any): any {
        return this.evaluateComparation(leftSideEvaluation, rightHandSideEvaluation);
    }

}
