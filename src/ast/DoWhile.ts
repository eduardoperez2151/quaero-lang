import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de las iteraciones Do-While.
*/
export class DoWhile implements Stmt {
  cond: Exp;
  body: Stmt;

  constructor(body: Stmt, cond: Exp) {
    this.cond = cond;
    this.body = body;
  }

  toString(): string {
    return `DoWhile(${this.body.toString()}, ${this.cond.toString()})`;
  }

  unparse(): string {
    return `do ${this.body.unparse()} while { ${this.cond.unparse()} }`;
  }

  evaluate(state: State): State {
    state=this.body.evaluate(state);
    if (typeof this.cond.evaluate(state) === "boolean") {
      while(typeof this.cond.evaluate(state) === "boolean" && this.cond.evaluate(state)){
        state=this.body.evaluate(state);
      }
      return state;
    }
    throw new EvalError("Error al evaluar la exprexion: debe ser de tipo booleana");
  }
}
