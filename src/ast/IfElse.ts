import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de las sentencias condicionales.
*/
export class IfElse implements  Exp {
    lhs:Exp;
    cexp:Exp;
    rhs:Exp;

  constructor(lhs:Exp,cexp:Exp,rhs:Exp) {
    this.cexp=cexp;
    this.lhs=lhs;
    this.rhs=rhs;
  }

  toString(): string {
    return `IfElse(${this.lhs.toString()},if ${this.cexp.toString()} else  ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `IfElse(${this.lhs.unparse()},if ${this.cexp.unparse()} else  ${this.rhs.unparse()})`;
  }

  evaluate(state: State): any {
    if (typeof this.cexp.evaluate(state) === "boolean") {
        return this.cexp.evaluate(state) ? this.lhs.evaluate(state):this.rhs.evaluate(state);
    }
    throw new EvalError("Error al evaluar la exprexion: debe ser de tipo booleana");
  }
}
