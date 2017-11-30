import {Exp} from '../ASTNode';
import {ListCollection, SetCollection, KeyValue} from '../AST';
import {State} from '../../interpreter/State';
import {AbstractBinaryExpression} from "./abstract/AbstractBinaryExpression";
import {GenericBinaryOperation} from "./generic/GenericBinaryOperation";
var _ = require("underscore");
export class Intersection extends AbstractBinaryExpression {

    constructor(leftHandSide: Exp, rightHandSide: Exp) {
        super(leftHandSide, rightHandSide, "/\\");
    }

    evaluate(state: State): any {
        let leftHandSideEvaluation = this.leftHandSideEvaluation(state);
        let rightHandSideEvaluation = this.rightHandSideEvaluation(state);
        if (this.isString(leftHandSideEvaluation)) leftHandSideEvaluation = this.createArray(leftHandSideEvaluation);
        if (this.isString(rightHandSideEvaluation)) rightHandSideEvaluation = this.createArray(rightHandSideEvaluation);
        if(this.isCollection(leftHandSideEvaluation)&& this.isCollection(rightHandSideEvaluation)){
          let intersection;
          intersection = this.doIntersection([...leftHandSideEvaluation],[...rightHandSideEvaluation]);
          if(this.isSet(leftHandSideEvaluation) && this.isSet(rightHandSideEvaluation)){
            intersection =new  Set(intersection);
          }
          intersection["keyValues"] = new Map();
          intersection = this.setKeys(intersection,leftHandSideEvaluation["keyValues"]);
          intersection = this.setKeys(intersection,rightHandSideEvaluation["keyValues"]);
          return intersection;
        }
        this.ThrowEvaluationException(rightHandSideEvaluation, leftHandSideEvaluation);
    }

    private doIntersection(array,array2){
      let result = [];
      for (let i = 0;i<array.length;i++){
        let existInArray2 = -1;
        if (array2.length>0) existInArray2 = array2.findIndex(value => AbstractBinaryExpression.deepEquals(array[i],value));
        let existInResult = -1;
        if(result.length>0) existInResult = result.findIndex(value => AbstractBinaryExpression.deepEquals(array[i],value));
        if(existInArray2 != -1 && existInResult == -1) result.push(array[i]);
    }
    return result;
  }
}
