import {Exp} from '../ASTNode';
import {State} from '../../interpreter/State';
import {ListCollection, SetCollection} from '../AST';
import {AbstractBinaryExpression} from "./AbstractBinaryExpression";

export class Concatenation extends AbstractBinaryExpression {

    constructor(leftHandSide: Exp, rightHandSide: Exp) {
        super(leftHandSide, rightHandSide, "++");
    }

    evaluate(state: State): any {
        let leftHandSideEvaluation = this.leftHandSideEvaluation(state);
        let rightHandSideEvaluation = this.rightHandSideEvaluation(state);

        if (this.isString(leftHandSideEvaluation)) leftHandSideEvaluation = new ListCollection(leftHandSideEvaluation.split(""));
        if (this.isString(rightHandSideEvaluation)) rightHandSideEvaluation = new ListCollection(rightHandSideEvaluation.split(""));

        let concatenation = leftHandSideEvaluation.arr.concat(rightHandSideEvaluation.arr);
        if (this.isSet(leftHandSideEvaluation) && this.isSet(rightHandSideEvaluation)) {
            return new SetCollection(concatenation);
        }
        if (this.isList(leftHandSideEvaluation) && this.isList(rightHandSideEvaluation)) {
            return new ListCollection(concatenation);
        }
        this.ThrowEvaluationException(rightHandSideEvaluation, leftHandSideEvaluation);
    }
}