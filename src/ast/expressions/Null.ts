import { Exp } from '../ASTNode';
import { State } from '../../interpreter/State';

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
