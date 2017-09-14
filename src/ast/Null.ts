import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de usos de variable en expresiones.
*/
export class Null implements Exp {
  value: null;

  toString(): string {
    return `Null(null)`;
  }

  unparse(): string {
    return "null";
  }

  evaluate(state: State): any {
    return null;
  }
}
