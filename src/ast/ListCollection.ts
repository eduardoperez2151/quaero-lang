import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class ListCollection implements Exp {

  listCol: [Exp];

  constructor(listCol: [Exp]) {
    this.listCol = listCol;
  }
  toString(): string {
    return `ListCollection(${this.listCol.toString()})`;
  }

  unparse(): string {
    //return `(${this.lhs.unparse()} + ${this.rhs.unparse()})`;
     return "Hacer unparse()";
  }

  evaluate(state: State): any {
    //return null;
  }
}
