import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de multiplicaciones.
*/
export class Multiplication implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Multiplication(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} * ${this.rhs.unparse()})`;
  }

  evaluate(state: State): any {
    var lres = this.lhs.evaluate(state);
    var rres = this.rhs.evaluate(state);
    if (typeof lres === "number"){
      if (typeof rres === "number" ){
        return lres * rres;
      }else{
        return new Array(lres+1).join(rres);
      }
    }
    throw new Error("Error de tipos.");
  }
}
