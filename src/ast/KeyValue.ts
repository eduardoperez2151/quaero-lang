import {Exp, Stmt} from './ASTNode';
import {State} from '../interpreter/State';

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

  unParse(): string {
    return `${this.id} : ${this.exp.unParse()}`;
  }

  evaluate(state: State): any {
    return new KeyValue(this.id, this.exp.evaluate(state));
  }
}
