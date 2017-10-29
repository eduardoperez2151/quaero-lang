import { Exp } from '../ASTNode';
import { State } from '../../interpreter/State';

export class Opposite implements Exp {

  value: Exp;

  constructor(value: Exp) {
    this.value = value;
  }

  toString(): string {
    return `Oposite(${this.value})`;
  }

  unParse(): string {
    return `- ${this.value}`;
  }

  evaluate(state: State): number {
    return (-1)*this.value.evaluate(state);
  }
}
