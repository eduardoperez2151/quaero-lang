import { Exp } from './ASTNode';
import { ListCollection, SetCollection} from './AST';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class Difference implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Difference(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    //return `(${this.lhs.unparse()} ++ ${this.rhs.unparse()})`;
    return "Hacer unparse";
  }

  evaluate(state: State): any {
    var lhs = this.lhs.evaluate(state);
    var rhs = this.rhs.evaluate(state);
    var diff
    if(typeof lhs ==="string"){
      var l = lhs.split("");
      if(typeof rhs === "string"){
        var r = rhs.split("");
        diff = l.filter(x => ! new Set(r).has(x));
        return new ListCollection(diff);
      }
      else if(rhs instanceof ListCollection || rhs instanceof SetCollection){
        diff = l.filter(x => ! new Set(rhs.arr).has(x));
        return new ListCollection(diff);
      }
    }
    else if((lhs instanceof ListCollection || lhs instanceof SetCollection) && (rhs instanceof ListCollection || rhs instanceof SetCollection)){
      if((lhs instanceof SetCollection && rhs instanceof SetCollection)){
        diff = lhs.arr.filter(x => ! new Set(rhs.arr).has(x));
        return new SetCollection(diff);
      }
      diff = lhs.arr.filter(x => ! new Set(rhs.arr).has(x));
      return new ListCollection(diff);
    }
    else if((lhs instanceof ListCollection || lhs instanceof SetCollection) && rhs === "string"){
        r = rhs.split("");
        diff = lhs.arr.filter(x => ! new Set(r).has(x));
        return new ListCollection(diff);
      }
    throw new Error("Error de tipos");
  }
}
