import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de conjunciones booleanas (AND).
*/
export class Conjunction implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Conjunction(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} && ${this.rhs.unparse()})`;
  }

  evaluate(state: State): any {
    var lres = this.lhs.evaluate(state);
    var rres = this.rhs.evaluate(state);
    if (typeof lres === "boolean" &&  typeof rres === "boolean"){
      return lres && rres;
    }
    throw new Error("Error de tipos.");
  }
}
