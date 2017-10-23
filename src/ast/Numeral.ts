import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de constantes numéricas o numerales.
*/
export class Numeral implements Exp {

  value: number;

  constructor(value: number) {
    this.value = value;
  }

  toString(): string {
    return `Numeral(${this.value})`;
  }

  unParse(): string {
    return `${this.value}`;
  }

  evaluate(state: State): number {
    if(typeof this.value === 'number'){
      return this.value;
    }
    throw new Error("Error de tipos");
  }
}
