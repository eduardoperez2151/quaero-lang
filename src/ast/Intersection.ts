import { Exp } from './ASTNode';
import { ListCollection, SetCollection, KeyValue} from './AST';
import { State } from '../interpreter/State';

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

    inters = lhs.arr.filter(x => rhs.has(x,state));
    if((lhs instanceof SetCollection && rhs instanceof SetCollection)){
      return new SetCollection(inters);
    }
    else{
      return new ListCollection(inters);
    }
  }
}
