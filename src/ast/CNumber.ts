import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de funcion boolean
*/
export class CNumber implements Exp {
  exp: Exp;

  constructor(exp: Exp) {
    this.exp = exp;
  }

  toString(): string {
    return `CNumber(${this.exp})`;
  }

  unparse(): string {
    return `number(${this.exp})`;
  }

  evaluate(state: State): any {
    var v = this.exp.evaluate(state);
    if (typeof v === 'string' || typeof v === 'number')
      return Number(v);
    throw new EvalError('Error de tipo.');
  }
}
