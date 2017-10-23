import {Exp} from '../ASTNode';
import {AbstractGenericComparator} from './AbstractGenericComparator'

export abstract class AbstractArithmeticBooleanOperation extends AbstractGenericComparator {

    protected constructor(leftHandSide: Exp, rightHandSide: Exp, operationSymbol: string, comparatorFunction: Function) {
        super(leftHandSide, rightHandSide, operationSymbol, comparatorFunction);
    }

    protected evaluation(leftSideEvaluation: any, rightSideEvaluation: any): any {
        return this.evaluateComparation(leftSideEvaluation, rightSideEvaluation);
    }

}
