import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de valores de verdad (cierto o falso).
*/
export class Negationation implements Exp {

  value: boolean;

  constructor(value: boolean) {
    this.value = value;
  }

  toString(): string {
    return `Negationation(${this.value})`;
  }

  unparse(): string {
    return this.value ? "! true" : "! false";
  }

  evaluate(state: State): any {
    return ! this.value;
  }
}
