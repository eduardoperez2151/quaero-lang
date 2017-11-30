import {Exp} from '../ASTNode';
import {ListCollection, SetCollection} from '../AST';
import {State} from '../../interpreter/State';
import {AbstractBinaryExpression} from "./abstract/AbstractBinaryExpression";
import {GenericBinaryOperation} from "./generic/GenericBinaryOperation";
var _ = require("underscore");

export class Union extends AbstractBinaryExpression {

    constructor(leftHandSide: Exp, rightHandSide: Exp) {
        super(leftHandSide, rightHandSide, "\\/");
    }

    evaluate(state: State): any {
        let leftHandSideEvaluation = this.leftHandSideEvaluation(state);
        let rightHandSideEvaluation = this.rightHandSideEvaluation(state);
        if (this.isString(leftHandSideEvaluation)) leftHandSideEvaluation = this.createArray(leftHandSideEvaluation);
        if (this.isString(rightHandSideEvaluation)) rightHandSideEvaluation = this.createArray(rightHandSideEvaluation);
        if(this.isCollection(leftHandSideEvaluation)&& this.isCollection(rightHandSideEvaluation)){
          let union;
          union = this.doUnion(leftHandSideEvaluation,rightHandSideEvaluation);
          if(this.isSet(leftHandSideEvaluation && this.isSet(rightHandSideEvaluation))){
            union = new Set([...union]);
          }
          union["keyValues"] = new Map();
          union = this.setKeys(union,leftHandSideEvaluation["keyValues"]);
          union = this.setKeys(union,rightHandSideEvaluation["keyValues"]);
          return union;
        }
        this.ThrowEvaluationException(rightHandSideEvaluation, leftHandSideEvaluation);
    }

    private doUnion(leftHandSideEvaluation: any, rightHandSideEvaluation: any) {
        let setAux = [...leftHandSideEvaluation, ...rightHandSideEvaluation];
        return this.removeRepeated(setAux);

    }
    private removeRepeated(array){
      let result = [];
      for (let i = 0;i<array.length;i++){
        if(result.length > 0){
          let existInResult = result.findIndex(item => {
              return AbstractBinaryExpression.deepEquals(array[i],item);}
          );
          if(existInResult == -1) result.push(array[i]);
        }else result.push(array[i]);
      }
      return result;
    }
}
