import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de String.
*/
export class Literal implements Exp {

  value: string;

  constructor(value: string) {
    this.value = JSON.parse(value);
  }

  toString(): string {
    return `String(${this.value})`;
  }

  unparse(): string {
    return `${this.value}`;
  }

  evaluate(state: State): any {
    return this.value;
  }
}
