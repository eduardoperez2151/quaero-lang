import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de funcion boolean
*/
export class CInt implements Exp {
  exp: Exp;

  constructor(exp: Exp) {
    this.exp = exp;
  }

  toString(): string {
    return `CInt(${this.exp})`;
  }

  unparse(): string {
    return `int(${this.exp})`;
  }

  evaluate(state: State): any {
    var v = this.exp.evaluate(state);
    if (typeof v === 'string' || typeof v === 'number')
      return parseInt((v as any));
    throw new EvalError('Error de tipo.');
  }
}
