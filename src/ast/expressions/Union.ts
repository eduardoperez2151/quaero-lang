import {Exp} from '../ASTNode';
import {ListCollection, SetCollection} from '../AST';
import {State} from '../../interpreter/State';
import {AbstractBinaryExpression} from "./abstract/AbstractBinaryExpression";

export class Union extends AbstractBinaryExpression {

    constructor(leftHandSide: Exp, rightHandSide: Exp) {
        super(leftHandSide, rightHandSide, "\\/");
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
        if(this.isCollection(leftHandSideEvaluation)&& this.isCollection(rightHandSideEvaluation)){
          let union;
          union = this.createSet(leftHandSideEvaluation,rightHandSideEvaluation);
          if(this.isList(leftHandSideEvaluation) || this.isList(rightHandSideEvaluation)){
            union = [...union];
          }

          union["keyValues"] = new Map();
          union = this.setKeys(union,leftHandSideEvaluation["keyValues"]);
          union = this.setKeys(union,rightHandSideEvaluation["keyValues"]);
          return union;
        }
        this.ThrowEvaluationException(rightHandSideEvaluation, leftHandSideEvaluation);
    }

    private createSet(leftHandSideEvaluation: any, rightHandSideEvaluation: any) {
        return new Set([...leftHandSideEvaluation, ...rightHandSideEvaluation]);
    }
}
