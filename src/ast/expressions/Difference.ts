import { Exp } from '../ASTNode';
import { State } from '../../interpreter/State';
import { ListCollection, SetCollection} from '../AST';
import {AbstractBinaryExpression} from "./abstract/AbstractBinaryExpression";
import {GenericBinaryOperation} from "./generic/GenericBinaryOperation";
var _ = require("underscore");

export class Difference extends AbstractBinaryExpression {

    constructor(leftHandSide: Exp, rightHandSide: Exp) {
        super(leftHandSide, rightHandSide, "--");
    }

    evaluate(state: State): any {
        let leftHandSideEvaluation = this.leftHandSideEvaluation(state);
        let rightHandSideEvaluation = this.rightHandSideEvaluation(state);
        if (this.isString(leftHandSideEvaluation)) leftHandSideEvaluation = this.createArray(leftHandSideEvaluation);
        if (this.isString(rightHandSideEvaluation)) rightHandSideEvaluation = this.createArray(rightHandSideEvaluation);
        if(this.isCollection(leftHandSideEvaluation) || this.isCollection(rightHandSideEvaluation)){
          let difference = this.doDifference([...leftHandSideEvaluation],[...rightHandSideEvaluation]);
          if(this.isSet(leftHandSideEvaluation) && this.isSet(leftHandSideEvaluation)){
            difference = [...difference];
          }
          difference["keyValues"] = new Map();
          difference = this.setKeys(difference,leftHandSideEvaluation["keyValues"]);
          difference = this.setKeys(difference,rightHandSideEvaluation["keyValues"]);
          return difference;
        }
        this.ThrowEvaluationException(rightHandSideEvaluation, leftHandSideEvaluation);
    }
    private doDifference(array,array2){
      let result = [];
      for (let i = 0;i<array.length;i++){
        let existInArray2 = -1;
        if (array2.length>0) existInArray2 = array2.findIndex(value => AbstractBinaryExpression.theCakeIsALie(array[i],value));
        let existInResult = -1;
        if(result.length>0)  existInResult = result.findIndex(value => AbstractBinaryExpression.theCakeIsALie(array[i],value));
        if(existInArray2 == -1 && existInResult == -1) {result.push(array[i]);}
    }
    return result;
  }
}
