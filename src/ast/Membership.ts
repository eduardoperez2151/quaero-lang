import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class Membership implements Exp {

  listCol: [Exp];
  value: Exp;

  constructor(value: Exp, listCol: [Exp]) {
    this.value = value;
    this.listCol = listCol;
  }

  toString(): string {
    return `Membership(${this.value.toString()}, ${this.listCol.toString()})`;
  }

  unparse(): string {
    //return `(${this.lhs.unparse()} ++ ${this.rhs.unparse()})`;
    return "Hacer unparse";
  }

  evaluate(state: State): any {
    /*
    var lres = this.lhs.evaluate(state);
    var rres = this.rhs.evaluate(state);
    return lres + rres;
    */
  }
}
