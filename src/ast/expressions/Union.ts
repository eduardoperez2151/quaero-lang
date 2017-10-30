import {Exp} from '../ASTNode';
import {ListCollection, SetCollection} from '../AST';
import {State} from '../../interpreter/State';
import {AbstractBinaryExpression} from "./AbstractBinaryExpression";

export class Union extends AbstractBinaryExpression {

    constructor(leftHandSide: Exp, rightHandSide: Exp) {
        super(leftHandSide, rightHandSide, "\\/");
    }

    evaluate(state: State): any {
        let leftHandSideEvaluation = this.leftHandSideEvaluation(state);
        let rightHandSideEvaluation = this.rightHandSideEvaluation(state);
        if (this.isString(leftHandSideEvaluation)) {
            let leftSide = leftHandSideEvaluation.split("");
            if (this.isString(rightHandSideEvaluation)) {
                let rightSide = rightHandSideEvaluation.split("");
                return new ListCollection(this.createSet(leftSide, rightSide));
            } else if (this.isCollection(rightHandSideEvaluation)) {
                return new ListCollection(this.createSet(leftSide, rightHandSideEvaluation.arr));
            }
        } else if (this.isCollection(leftHandSideEvaluation) && this.isCollection(rightHandSideEvaluation)) {
            if (this.isSet(leftHandSideEvaluation) && this.isSet(rightHandSideEvaluation)) {
                return new SetCollection(this.createSet(leftHandSideEvaluation.arr, rightHandSideEvaluation.arr));
            }
            return new ListCollection(this.createSet(leftHandSideEvaluation.arr, rightHandSideEvaluation.arr));
        } else if (this.isString(rightHandSideEvaluation)) {
            let rightSide = rightHandSideEvaluation.split("");
            return new ListCollection(this.createSet(leftHandSideEvaluation.arr, rightSide));
        }
        this.ThrowEvaluationException(rightHandSideEvaluation, leftHandSideEvaluation);
    }

    private createSet(leftHandSideEvaluation: any, rightHandSideEvaluation: any) {
        return [...new Set([...leftHandSideEvaluation, ...rightHandSideEvaluation])];
    }
}
