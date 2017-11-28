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
        if (this.isString(leftHandSideEvaluation)) {
          leftHandSideEvaluation = leftHandSideEvaluation.split("");
          leftHandSideEvaluation["keyValues"] = new Map();
        }
        if (this.isString(rightHandSideEvaluation)) {
          rightHandSideEvaluation = rightHandSideEvaluation.split("");
          rightHandSideEvaluation["keyValues"] = new Map();
        }
        if(this.isCollection(leftHandSideEvaluation)&& this.isCollection(rightHandSideEvaluation)){
          let leftArray = [...leftHandSideEvaluation];
          let rightSet = new Set([...rightHandSideEvaluation]);
          let intersection;
          intersection = leftArray.filter(x => rightSet.has(x));
          if(this.isSet(leftHandSideEvaluation) && this.isSet(rightHandSideEvaluation)){
            intersection = new Set(intersection);;
          }
          intersection["keyValues"] = new Map();
          intersection = this.setKeys(intersection,leftHandSideEvaluation["keyValues"]);
          intersection = this.setKeys(intersection,rightHandSideEvaluation["keyValues"]);
          return intersection;
        }
        this.ThrowEvaluationException(rightHandSideEvaluation, leftHandSideEvaluation);
    }
}
