import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class Dot implements Exp {

  listCol: [Exp];
  key: string;

  constructor(listCol: [Exp], key: string, ) {
    this.key = key;
    this.listCol = listCol;
  }

  toString(): string {
    return `Dot(${this.listCol.toString()}, ${this.key.toString()})`;
  }

  unparse(): string {
    //return `(${this.lhs.unparse()} ++ ${this.rhs.unparse()})`;
    return "Hacer unparse";
  }

  evaluate(state: State): any {
    /*
    var lres = this.lhs.evaluate(state);
    var rres = this.rhs.evaluate(state);
    return lres + rres;
    */
  }
}
