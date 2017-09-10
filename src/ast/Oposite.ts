import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de constantes numéricas o numerales.
*/
export class Oposite implements Exp {

  value: number;

  constructor(value: number) {
    this.value = value;
  }

  toString(): string {
    return `Oposite(${this.value})`;
  }

  unparse(): string {
    return `- ${this.value}`;
  }

  evaluate(state: State): number {
    return - this.value;
  }
}
