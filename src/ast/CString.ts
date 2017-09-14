import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de funcion String
*/
export class CString implements Exp {
  exp: Exp;

  constructor(exp: Exp) {
    this.exp = exp;
  }

  toString(): string {
    return `CString(${this.exp})`;
  }

  unparse(): string {
    return `string(${this.exp})`;
  }

  evaluate(state: State): any {
    var v = this.exp.evaluate(state);
    return v.toString();
  }
}
