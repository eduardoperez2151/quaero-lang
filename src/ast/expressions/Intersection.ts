import {Exp} from '../ASTNode';
import {ListCollection, SetCollection, KeyValue} from '../AST';
import {State} from '../../interpreter/State';
import {AbstractBinaryExpression} from "./AbstractBinaryExpression";

export class Intersection extends AbstractBinaryExpression {

    constructor(leftHandSide: Exp, rightHandSide: Exp) {
        super(leftHandSide, rightHandSide, "/\\");
    }

    evaluate(state: State): any {
        let leftHandSideEvaluation = this.leftHandSideEvaluation(state);
        let rightHandSideEvaluation = this.rightHandSideEvaluation(state);

        if (this.isString(leftHandSideEvaluation)) leftHandSideEvaluation = new ListCollection(leftHandSideEvaluation.split(""));
        if (this.isString(rightHandSideEvaluation)) rightHandSideEvaluation = new ListCollection(rightHandSideEvaluation.split(""));

        let intersection = leftHandSideEvaluation.arr.filter(x => rightHandSideEvaluation.has(x));
        if (this.isSet(leftHandSideEvaluation) && this.isSet(rightHandSideEvaluation)) {
            return new SetCollection(intersection);
        }
        if (this.isList(leftHandSideEvaluation) && this.isList(rightHandSideEvaluation)) {
            return new ListCollection(intersection);
        }
        this.ThrowEvaluationException(rightHandSideEvaluation, leftHandSideEvaluation);
    }
}
