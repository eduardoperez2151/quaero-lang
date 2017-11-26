import {Exp} from '../ASTNode';
import {ListCollection, SetCollection, KeyValue} from '../AST';
import {State} from '../../interpreter/State';
import {AbstractBinaryExpression} from "./abstract/AbstractBinaryExpression";

export class Intersection extends AbstractBinaryExpression {

    constructor(leftHandSide: Exp, rightHandSide: Exp) {
        super(leftHandSide, rightHandSide, "/\\");
    }

    evaluate(state: State): any {
        let leftHandSideEvaluation = this.leftHandSideEvaluation(state);
        let rightHandSideEvaluation = this.rightHandSideEvaluation(state);

        if (this.isString(leftHandSideEvaluation)) leftHandSideEvaluation = new ListCollection(leftHandSideEvaluation.split(""));
        if (this.isString(rightHandSideEvaluation)) rightHandSideEvaluation = new ListCollection(rightHandSideEvaluation.split(""));
        if(this.isCollection(leftHandSideEvaluation)&& this.isCollection(rightHandSideEvaluation)){
          let leftArray = [...leftHandSideEvaluation];
          let rightSet = new Set([...rightHandSideEvaluation]);
          let intersection = leftArray.filter(x => rightSet.has(x));
          intersection["keyValues"] = new Map();
          intersection = this.setKeys(intersection,leftHandSideEvaluation["keyValues"]);
          intersection = this.setKeys(intersection,rightHandSideEvaluation["keyValues"]);
          if(this.isList(leftHandSideEvaluation) || this.isList(rightHandSideEvaluation)){
            return intersection
          }
          return new Set(intersection);
        }
        this.ThrowEvaluationException(rightHandSideEvaluation, leftHandSideEvaluation);
    }
}
