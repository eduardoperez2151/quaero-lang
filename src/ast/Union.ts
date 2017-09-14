import { Exp } from './ASTNode';
import { ListCollection, SetCollection} from './AST';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class Union implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Union(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    //return `(${this.lhs.unparse()} ++ ${this.rhs.unparse()})`;
    return "Hacer unparse";
  }

  evaluate(state: State): any {
    var lhs = this.lhs.evaluate(state);
    var rhs = this.rhs.evaluate(state);
    var union
    if(typeof lhs ==="string"){
      var l = lhs.split("");
      if(typeof rhs === "string"){
        var r = rhs.split("");
        union = [...new Set([...l, ...r])];
        return new ListCollection(union);
      }
      else if(rhs instanceof ListCollection || rhs instanceof SetCollection){
        union = [...new Set([...l, ...rhs.arr])];
          return new ListCollection(union);
      }
    }
    else if((lhs instanceof ListCollection || lhs instanceof SetCollection) && (rhs instanceof SetCollection || rhs instanceof ListCollection)){
      if((lhs instanceof SetCollection && rhs instanceof SetCollection)){
        union = [...new Set([...lhs.arr, ...rhs.arr])];
        return new SetCollection(union);
      }
      union = [...new Set([...lhs.arr, ...rhs.arr])];
      return new ListCollection(union);
    }
    else if(typeof rhs === "string"){
        r = rhs.split("");
        union = [...new Set([...lhs.arr, ...r])];
        return new ListCollection(union);
      }
    throw new Error("Error de tipos");
  }
}
