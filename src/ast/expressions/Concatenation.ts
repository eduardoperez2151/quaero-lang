import {Exp} from '../ASTNode';
import {State} from '../../interpreter/State';
import {ListCollection, SetCollection} from '../AST';
import {AbstractBinaryExpression} from "./abstract/AbstractBinaryExpression";

export class Concatenation extends AbstractBinaryExpression {

    constructor(leftHandSide: Exp, rightHandSide: Exp) {
        super(leftHandSide, rightHandSide, "++");
    }

    evaluate(state: State): any {
        let leftHandSideEvaluation = this.leftHandSideEvaluation(state);
        let rightHandSideEvaluation = this.rightHandSideEvaluation(state);

        if (this.isString(leftHandSideEvaluation)) {
          leftHandSideEvaluation = leftHandSideEvaluation.split("");
          leftHandSideEvaluation["keyValues"] = new Map();
        }
        if (this.isString(rightHandSideEvaluation)) {
          rightHandSideEvaluation = rightHandSideEvaluation.split("");
          rightHandSideEvaluation["keyValues"] = new Map();
        }
        if(this.isList(leftHandSideEvaluation) && this.isList(rightHandSideEvaluation)){
          let concatenation = leftHandSideEvaluation.concat(rightHandSideEvaluation);
          concatenation["keyValues"] = new Map();
          concatenation = this.setKeys(concatenation,leftHandSideEvaluation["keyValues"]);
          concatenation = this.setKeys(concatenation,rightHandSideEvaluation["keyValues"]);
          return concatenation;
        }
        this.ThrowEvaluationException(rightHandSideEvaluation, leftHandSideEvaluation);
    }
}
