import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

export class Variable implements Exp {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  toString(): string {
    return `Variable(${this.id})`;
  }

  unParse(): string {
    return this.id;
  }

  evaluate(state: State): any {
    return state.get(this.id);
  }
}
