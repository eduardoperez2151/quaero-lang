import { Exp } from '../ASTNode';
import { State } from '../../interpreter/State';
import { ListCollection, SetCollection} from '../AST';
import {AbstractBinaryExpression} from "./abstract/AbstractBinaryExpression";

export class Difference extends AbstractBinaryExpression {

    constructor(leftHandSide: Exp, rightHandSide: Exp) {
        super(leftHandSide, rightHandSide, "--");
    }

    evaluate(state: State): any {
        let leftHandSideEvaluation = this.leftHandSideEvaluation(state);
        let rightHandSideEvaluation = this.rightHandSideEvaluation(state);

        if (this.isString(leftHandSideEvaluation)) leftHandSideEvaluation = leftHandSideEvaluation.split("");
        if (this.isString(rightHandSideEvaluation)) rightHandSideEvaluation =rightHandSideEvaluation.split("");
        if(this.isList(leftHandSideEvaluation) && this.isList(rightHandSideEvaluation)){
          let setR = new Set(rightHandSideEvaluation);
          let difference = leftHandSideEvaluation.filter(x => !setR.has(x));
          difference["keyValues"] = new Map();
          difference = this.setKeys(difference,leftHandSideEvaluation["keyValues"]);
          difference = this.setKeys(difference,rightHandSideEvaluation["keyValues"]);
          return difference;
        }
        this.ThrowEvaluationException(rightHandSideEvaluation, leftHandSideEvaluation);
    }
}
