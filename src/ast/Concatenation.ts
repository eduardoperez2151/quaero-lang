import { Exp } from './ASTNode';
import { ListCollection,SetCollection } from './AST';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class Concatenation implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Concatenation(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unParse(): string {
    //return `(${this.lhs.unParse()} ++ ${this.rhs.unParse()})`;
    return "Hacer unParse";
  }

  evaluate(state: State): any {
    var lhs = this.lhs.evaluate(state);
    var rhs = this.rhs.evaluate(state);
    if(typeof lhs ==="string"){
      var l = lhs.split("");
      if(typeof rhs === "string"){
        var r = rhs.split("");
        return new ListCollection(l.concat(r));
      }
      else if(rhs instanceof ListCollection || rhs instanceof SetCollection){
        return new ListCollection(l.concat(rhs.arr));
      }
    }
    else if(lhs instanceof ListCollection){
      if(rhs instanceof ListCollection){
        return new ListCollection(lhs.arr.concat(rhs.arr));
      }
      else if(typeof rhs === "string"){
        r = rhs.split("");
        return new ListCollection(lhs.arr.concat(r));
      }
    }
    throw new Error("Error de tipos");
  }
}
