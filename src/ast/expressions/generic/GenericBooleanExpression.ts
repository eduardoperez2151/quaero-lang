import {Exp} from '../../ASTNode';
import {AbstractGenericComparator} from '../abstract/AbstractGenericComparator'

export class GenericBooleanExpression extends AbstractGenericComparator {

    constructor(leftHandSide: Exp, rightHandSide: Exp, operationSymbol: string, comparatorFunction: Function) {
        super(leftHandSide, rightHandSide, operationSymbol, comparatorFunction);
    }

    protected evaluation(leftSideEvaluation: any, rightHandSideEvaluation: any): any {
        return this.evaluateComparation(leftSideEvaluation, rightHandSideEvaluation);
    }
}
