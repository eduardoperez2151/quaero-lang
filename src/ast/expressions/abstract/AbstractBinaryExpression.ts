import {Exp} from '../../ASTNode';
import {State} from '../../../interpreter/State';
import {ErrorTypeInfo} from "../../ErrorTypeInfo";
import {AbstractExpression} from "./AbstractExpression";

export abstract class AbstractBinaryExpression extends AbstractExpression {

    protected leftHandSide: Exp;
    protected rightHandSide: Exp;
    protected operationSymbol: string;

    protected constructor(leftHandSide: Exp, rightHandSide: Exp, operationSymbol: string) {
        super();
        this.leftHandSide = leftHandSide;
        this.rightHandSide = rightHandSide;
        this.operationSymbol = operationSymbol;
    }

    protected leftHandSideEvaluation(state: State): any {
        return this.evaluateExpression(this.leftHandSide, state);
    }

    protected rightHandSideEvaluation(state: State): any {
        return this.evaluateExpression(this.rightHandSide, state);
    }

    protected ThrowEvaluationException(rightHandSideEvaluation: any, leftHandSideEvaluation: any) {
        let errors: [ErrorTypeInfo] = [new ErrorTypeInfo("rightHandSide", rightHandSideEvaluation), new ErrorTypeInfo("leftHandSide", leftHandSideEvaluation)];
        super.throwExceptionOnErrorCheckType(errors);
    }
    protected setKeys(array,map){
      //let delKeys = new Map(); Que se deberia hacer si se quita una key del array pero luego aparece otra vez
      let keys = [...map.keys()]
      for (let i = 0;i<keys.length;i++){
  ////      if(array[keys[i]]){
  //        throw new Error("Claves duplicadas")
  ///      }
        if(array.includes(map.get(keys[i]))){
          array[keys[i]] = map.get(keys[i]);
          array["keyValues"].set(keys[i],map.get(keys[i]));
        }
      }
      return array;
    }
    toString(): string {
        return `${this.constructor.name}(${this.leftHandSide.toString()}, ${this.rightHandSide.toString()})`;
    }

    unParse(): string {
        return `(${this.leftHandSide.unParse()} ${this.operationSymbol} ${this.rightHandSide.unParse()})`;
    }
    protected createArray (string){
      let array = string.split("");
      array["keyValues"] = new Map();
      return array;
    }
    static theCakeIsALie(a,b){
      if(a instanceof Set && b instanceof Set){
        let keysA = [...a["keyValues"].keys()];
        let keysB = [...b["keyValues"].keys()];
        if(a.size != b.size  || keysA.length != keysB.length) return false;
        else if(a.size ==0) return true;
        let aIncludedInB = [...a].every(itemA =>[...b].some(itemB => this.theCakeIsALie(itemA,itemB)));
        let aIncludedInBKeys = [...a["keyValues"].keys()].every(itemA =>[...b["keyValues"].keys()].some(itemB => this.theCakeIsALie(itemA,itemB)))
        if(aIncludedInB && aIncludedInBKeys) return true;
        return false
      }
      if(a instanceof Array && b instanceof Array){
        if(a.length != b.length) return false;
        else if(a.length ==0) return true;
        let l33t=true;
        for(let i=0;i<a.length;i++){
          l33t = l33t && this.theCakeIsALie(a[i],b[i]);
        }
        let sameKeys;
        if(typeof a["keyValues"]=='undefined'){
          if(typeof b["keyValues"]=='undefined') sameKeys = true;
          else sameKeys = false;
        }else sameKeys = this.theCakeIsALie([...a["keyValues"].keys()],[...b["keyValues"].keys()]);
        return l33t && sameKeys;
      }
      if(b instanceof Set || b instanceof Array || a instanceof Array || a instanceof Set){return false;}
      return a==b;
    }

}
