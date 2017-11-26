import { Exp, Stmt } from '../ASTNode';
import { State } from '../../interpreter/State';

/**
  Representación de las sentencias condicionales.
*/
export class IfThenElse implements Stmt {
  cond: Exp;
  thenBody: Stmt;
  elseBody: Stmt;

  constructor(cond: Exp, thenBody: Stmt, elseBody: Stmt) {
    this.cond = cond;
    this.thenBody = thenBody;
    this.elseBody = elseBody;
  }

  toString(): string {
    return `IfThenElse(${this.cond.toString()}, ${this.thenBody.toString()}, ${this.elseBody.toString()})`;
  }

  unParse(): string {
    return `if ${this.cond.unParse()} then { ${this.thenBody.unParse()} } else { ${this.elseBody.unParse()} }`;
  }

  evaluate(state: State): State {
    
    if (typeof this.cond.evaluate(state) === "boolean") {
      return this.cond.evaluate(state) ? this.thenBody.evaluate(state):this.elseBody.evaluate(state);
    }
    throw new EvalError("Error al evaluar la exprexion: debe ser de tipo booleana");
  }
}
