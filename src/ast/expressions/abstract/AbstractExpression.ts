import {ErrorTypeInfo, Exp, ListCollection, SetCollection} from '../../AST';
import {State} from '../../../interpreter/State';
import {KeyValue} from "../KeyValue";
import {Variable} from "../../statements/Variable";


export abstract class AbstractExpression implements Exp {

    protected evaluateExpression(expression: Exp, state: State): any {
        return expression.evaluate(state);
    }

    protected isBoolean(expressionEvaluation: any): boolean {
        return typeof expressionEvaluation === "boolean";
    }

    protected isNumber(expressionEvaluation: any): boolean {
        return typeof expressionEvaluation === "number";
    }

    protected isString(expressionEvaluation: any): boolean {
        return typeof expressionEvaluation === "string";
    }

    protected isList(expressionEvaluation: any): boolean {
        return expressionEvaluation instanceof Array;
    }

    protected isSet(expressionEvaluation: any): boolean {
        return expressionEvaluation instanceof Set;
    }

    protected isCollection(expressionEvaluation: any): boolean {
        return this.isList(expressionEvaluation) || this.isSet(expressionEvaluation);
    }

    protected isKeyValue(expressionEvaluation: any): boolean {
        return expressionEvaluation instanceof KeyValue;
    }

    protected isVariable(expressionEvaluation: any): boolean {
        return expressionEvaluation instanceof Variable;
    }

    protected throwExceptionOnErrorCheckType(errorInfo: [ErrorTypeInfo]) {
        throw new EvalError(`\n######## ERROR DE TIPOS ########\n${errorInfo.join("\n") }\n################################`);
    }

    abstract toString(): string;

    abstract unParse(): string

    abstract evaluate(state: State): any;
    static deepEquals(a, b){
      if(a instanceof Set && b instanceof Set){
        let keysA = [...a["keyValues"].keys()];
        let keysB = [...b["keyValues"].keys()];
        if(a.size != b.size  || keysA.length != keysB.length) return false;
        else if(a.size ==0) return true;
        let aIncludedInB = [...a].every(itemA =>[...b].some(itemB => this.deepEquals(itemA,itemB)));
        let aIncludedInBKeys = [...a["keyValues"].keys()].every(itemA =>[...b["keyValues"].keys()].some(itemB => this.deepEquals(itemA,itemB)))
        if(aIncludedInB && aIncludedInBKeys) return true;
        return false
      }
      if(a instanceof Array && b instanceof Array){
        if(a.length != b.length) return false;
        else if(a.length ==0) return true;
        let accum=true;
        for(let i=0;i<a.length;i++){
          accum = accum && this.deepEquals(a[i],b[i]);
        }
        let sameKeys;
        if(typeof a["keyValues"]=='undefined'){
          if(typeof b["keyValues"]=='undefined') sameKeys = true;
          else sameKeys = false;
        }else sameKeys = this.deepEquals([...a["keyValues"].keys()],[...b["keyValues"].keys()]);
        return accum && sameKeys;
      }
      if(b instanceof Set || b instanceof Array || a instanceof Array || a instanceof Set){return false;}
      if(typeof a != typeof b)return false;
      return a==b;
    }
    static isGreaterEqual(a,b){
      if((a instanceof Set && b instanceof Set) || (a instanceof Array && b instanceof Array)){
        a = [...a];
        b = [...b];
        if(a.length == b.length && a.length ==0) return true;
        let result= true;
        for(let i = 0;i<a.length;i++){
          let itemA = a[i];
          let itemB = b[i];
          let isEqual = this.isEqualLexico(itemA,itemB);
          let isGreater = this.isGreaterEqual(itemA,itemB);
          if(((!isEqual && isGreater) || typeof itemB === 'undefined') && result) return true;
          if(!isEqual && !isGreater && typeof itemB !== 'undefined') result = false;
        }
        return (result && a.length >= b.length) ? true:false
      }

      return a>b;
    }
    static islesserEqual(a,b){
      if((a instanceof Set && b instanceof Set) || (a instanceof Array && b instanceof Array)){
        a = [...a];
        b = [...b];
        if(a.length == b.length && a.length ==0) return true;
        let result= true;
        for(let i = 0;i<a.length;i++){
          let itemA = a[i];
          let itemB = b[i];
          let isEqual = this.isEqualLexico(itemA,itemB);
          let isLesser = this.islesserEqual(itemA,itemB);
          if((!isEqual && isLesser) && result) return true;
          if((!isEqual && !isLesser) || typeof itemB === 'undefined') result = false;
        }
        return (result && a.length <= b.length) ? true:false
      }
      return a<b;
    }
    static isEqualLexico(a,b){
      if((a instanceof Set && b instanceof Set) || (a instanceof Array && b instanceof Array)){
        a = [...a];
        b = [...b];
        if(a.length != b.length) return false;
        if(a.length ==0) return  true;
        let result=true;
        for(let i=0;i<a.length;i++){
          result = result && this.isEqualLexico(a[i],b[i]);
        }
        return result;
      }
      if(b instanceof Set || b instanceof Array || a instanceof Array || a instanceof Set){return false;}
      return a==b;
    }
}
