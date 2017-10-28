import { Exp } from './ASTNode';
import { ListCollection, SetCollection} from './AST';
import { State } from '../interpreter/State';

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

  unParse(): string {
    //return `(${this.lhs.unParse()} ++ ${this.rhs.unParse()})`;
    return "Hacer unParse";
  }

  evaluate(state: State): any {
    var lhs = this.lhs.evaluate(state);
    var rhs = this.rhs.evaluate(state);
    var inters = [];
    if(typeof lhs === "string")
      lhs = new ListCollection (lhs.split(""));
    if (typeof rhs === "string")
      rhs = new ListCollection (rhs.split(""));

    inters = lhs.arr.filter(x => !rhs.has(x,state));
    if((lhs instanceof SetCollection && rhs instanceof SetCollection)){
      return new SetCollection(inters);
    }
    else{
      return new ListCollection(inters);
    }
  }


/* Lo que estaba antes ...

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
  */
}
