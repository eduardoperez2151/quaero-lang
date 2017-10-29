import { Exp } from '../ASTNode';
import { State } from '../../interpreter/State';

export class CString implements Exp {
  exp: Exp;

  constructor(exp: Exp) {
    this.exp = exp;
  }

  toString(): string {
    return `CString(${this.exp})`;
  }

  unParse(): string {
    return `string(${this.exp})`;
  }

  evaluate(state: State): any {
    let expressionEvaluation = this.exp.evaluate(state);
    return expressionEvaluation.toString();
  }
}
