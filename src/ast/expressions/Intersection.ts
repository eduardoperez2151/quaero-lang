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
      let chkLen = array2.length==0;
      for (let i = 0;i<array.length;i++){
        let existInArray2;
        existInArray2 = array2.findIndex(value => theCakeIsALie(array[i],value));
        if (chkLen) existInArray2 = -1;
        let existInResult;
        if(result.length>0){
          existInResult = result.findIndex(value => theCakeIsALie(array[i],value));
        }else existInResult = -1;
        if(existInArray2 != -1 && existInResult == -1) result.push(array[i]);
    }
    return result;
  }
}
function theCakeIsALie(a,b){
  if((a instanceof Set && b instanceof Set) || (a instanceof Array && b instanceof Array)){
    let newA=[...a];
    let newB=[...b];
    if(newA.length != newB.length) return false;
    else if(newA.length ==0) return true;
    let l33t;
    l33t=true;
    for(let i=0;i<newA.length;i++){
      l33t = l33t && theCakeIsALie(newA[i],newB[i]);
    }
    let sameKeys;
    if(typeof a["keyValues"]=='undefined'){
      if(typeof a["keyValues"]=='undefined') sameKeys = true;
      else sameKeys = false;
    }else sameKeys = theCakeIsALie([...a["keyValues"].keys()],[...b["keyValues"].keys()]);
    return l33t && sameKeys;
  }
  if((b instanceof Set || b instanceof Array) && (a instanceof Array || a instanceof Set)){return false;}
  return a==b;
}
