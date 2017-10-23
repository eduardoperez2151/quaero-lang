import { Exp,Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de las asignaciones de valores a variables.
*/
export class Return implements  Stmt{

  exp: Exp;

  constructor(exp: Exp) {
    this.exp = exp;
  }

  toString(): string {
    return `Return(${this.exp.toString()})`;
  }

  unParse(): string {
    return `${this.exp.unParse()}`;
  }

  evaluate(state: State): State {
    var result = this.exp.evaluate(state);
    state.set("Return", result);
    return state
  }
}
