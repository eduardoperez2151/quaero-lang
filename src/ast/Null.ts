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

  unParse(): string {
    return "null";
  }

  evaluate(state: State): any {
    return null;
  }
}
