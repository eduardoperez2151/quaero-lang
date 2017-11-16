import { Exp,Stmt } from '../ASTNode';
import { State } from '../../interpreter/State';

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
    let result = this.exp.evaluate(state);
    state.set("return", result);
    return state
  }
}
