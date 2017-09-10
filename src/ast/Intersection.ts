import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class Intersection implements Exp {

  lhs: [Exp];
  rhs: [Exp];

  constructor(lhs: [Exp], rhs: [Exp]) {
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
    /*
    var lres = this.lhs.evaluate(state);
    var rres = this.rhs.evaluate(state);
    return lres + rres;
    */
  }
}
