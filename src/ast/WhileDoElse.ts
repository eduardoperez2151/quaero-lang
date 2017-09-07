import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de las iteraciones while-do.
*/
export class WhileDoElse implements Stmt {
  cond: Exp;
  doBody: Stmt;
  elseBody:Stmt;

  constructor(cond: Exp, doBody: Stmt, elseBody: Stmt) {
    this.cond = cond;
    this.doBody = doBody;
    this.elseBody = elseBody;
  }

  toString(): string {
    return `WhileDoElse(${this.cond.toString()},${this.doBody.toString()},${this.elseBody.toString()})`;
  }

  unparse(): string {
    return `while ${this.cond.unparse()} do { ${this.doBody.unparse()} } else { ${this.elseBody.unparse()} } `;
  }

  evaluate(state: State): State {
    if (typeof this.cond.evaluate(state) === "boolean") {
      if (this.cond.evaluate(state))
        while(typeof this.cond.evaluate(state)== "boolean" && this.cond.evaluate(state)){
          state=this.doBody.evaluate(state);
        }
      else{
        state=this.elseBody.evaluate(state);
      }
      return state;
    }
    else{
      throw new EvalError("Error al evaluar la exprexion: debe ser de tipo booleana");
    }
  }
}
