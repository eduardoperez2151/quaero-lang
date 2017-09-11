import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de las asignaciones de valores a variables.
*/
export class KeyValue implements Stmt {

  id: string;
  exp: Exp;

  constructor(id: string, exp: Exp) {
    this.id = id;
    this.exp = exp;
  }

  toString(): string {
    return `KeyValue(${this.id}, ${this.exp.toString()})`;
  }

  unparse(): string {
    return `${this.id} : ${this.exp.unparse()}`;
  }

  evaluate(state: State): any {
    return new KeyValue(this.id, this.exp.evaluate(state));
  }
}
