import { Exp } from '../ASTNode';
import { State } from '../../interpreter/State';

export class TruthValue implements Exp {

  value: boolean;

  constructor(value: boolean) {
    this.value = value;
  }

  toString(): string {
    return `TruthValue(${this.value})`;
  }

  unParse(): string {
    return this.value ? "true" : "false";
  }

  evaluate(state: State): any {
    return this.value;
  }
}
