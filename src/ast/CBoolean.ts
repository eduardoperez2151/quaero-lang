import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de funcion boolean
*/
export class CBoolean implements Exp {
  exp: Exp;

  constructor(exp: Exp) {
    this.exp = exp;
  }

  toString(): string {
    return `CBoolean(${this.exp})`;
  }

  unparse(): string {
    return `boolean(${this.exp})`;
  }

  evaluate(state: State): any {
    var v = this.exp.evaluate(state);
    if (v == 0 || v == null || v == "")
      return false;
    return true;
  }
}
