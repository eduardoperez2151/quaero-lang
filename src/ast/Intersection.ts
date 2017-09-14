import { Exp } from './ASTNode';
import { ListCollection, SetCollection} from './AST';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class Intersection implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Intersection(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    //return `(${this.lhs.unparse()} ++ ${this.rhs.unparse()})`;
    return "Hacer unparse";
  }

  evaluate(state: State): any {
    var lhs = this.lhs.evaluate(state);
    var rhs = this.rhs.evaluate(state);
    var inters
    if(typeof lhs ==="string"){
      var l = lhs.split("");
      if(typeof rhs === "string"){
        var r = rhs.split("");
        inters = [...new Set(l)].filter(x => new Set(r).has(x));
        return new ListCollection(inters);
      }
      else if(rhs instanceof ListCollection || rhs instanceof SetCollection){
        inters = [...new Set(l)].filter(x => new Set(rhs.arr).has(x));
        return new ListCollection(inters);
      }
    }
    else if((lhs instanceof ListCollection || lhs instanceof SetCollection) && (rhs instanceof SetCollection || rhs instanceof ListCollection)){
      if((lhs instanceof SetCollection && rhs instanceof SetCollection)){
        inters = [...new Set(l)].filter(x => new Set(rhs.arr).has(x));
        return new SetCollection(inters);
      }
      inters = [...new Set(l)].filter(x => new Set(rhs.arr).has(x));
      return new ListCollection(inters);
    }
    else if((lhs instanceof ListCollection || lhs instanceof SetCollection) && rhs === "string"){
        r = rhs.split("");
        inters = [...new Set(l)].filter(x => new Set(rhs.arr).has(x));
        return new ListCollection(inters);
      }
    throw new Error("Error de tipos");
  }
}
