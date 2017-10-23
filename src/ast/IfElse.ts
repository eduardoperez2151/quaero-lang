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

  unParse(): string {
    return `IfElse(${this.lhs.unParse()},if ${this.cexp.unParse()} else  ${this.rhs.unParse()})`;
  }

  evaluate(state: State): any {
    if (typeof this.cexp.evaluate(state) === "boolean") {
        return this.cexp.evaluate(state) ? this.lhs.evaluate(state):this.rhs.evaluate(state);
    }
    throw new EvalError("Error al evaluar la exprexion: debe ser de tipo booleana");
  }
}
