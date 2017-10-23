import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de las asignaciones de valores a variables.
*/
export class ExpAsStmt implements Stmt {

  exp: Exp;

  constructor(exp: Exp) {
    this.exp = exp;
  }

  toString(): string {
    return `ExpAsStmt(${this.exp.toString()})`;
  }

  unParse(): string {
    return `${this.exp.unParse()}`;
  }

  evaluate(state: State): State {
    this.exp.evaluate(state);
    return state
  }
}
