import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class SetCollection implements Exp {

  setCol: [Exp];

  constructor(setCol: [Exp]) {
    this.setCol = setCol;
  }
  toString(): string {
    return `SetCollection(${this.setCol.toString()})`;
  }

  unparse(): string {
    //return `(${this.lhs.unparse()} + ${this.rhs.unparse()})`;
     return "Hacer unparse()";
  }

  evaluate(state: State): any {
    //return null;
  }
}
