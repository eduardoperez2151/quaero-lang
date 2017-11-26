import { Exp, Stmt } from '../ASTNode';
import { State } from '../../interpreter/State';

/**
  Representación de las sentencias condicionales.
*/
export class IfThen implements Stmt {
  cond: Exp;
  thenBody: Stmt;

  constructor(cond: Exp, thenBody: Stmt) {
    this.cond = cond;
    this.thenBody = thenBody;
  }

  toString(): string {
    return `IfThen(${this.cond.toString()}, ${this.thenBody.toString()})`;
  }

  unParse(): string {
    return `if ${this.cond.unParse()} then { ${this.thenBody.unParse()} }`;
  }

  evaluate(state: State): State {
    if (typeof this.cond.evaluate(state) === "boolean") {
      return this.cond ? this.thenBody.evaluate(state):state;
    }
    throw new EvalError("Error al evaluar la exprexion: debe ser de tipo booleana");
  }
}
