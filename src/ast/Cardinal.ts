import { Exp } from './ASTNode';
import { ListCollection,SetCollection } from './AST';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class Cardinal implements Exp {

  listCol: Exp;

  constructor(listCol: Exp) {
    this.listCol = listCol;
  }

  toString(): string {
    return `Cardinal(${this.listCol.toString()}`;
  }

  unparse(): string {
    //return `(${this.lhs.unparse()} ++ ${this.rhs.unparse()})`;
    return "Hacer unparse";
  }

  evaluate(state: State): any {
    var list = this.listCol.evaluate(state)
    if(list instanceof ListCollection || list instanceof SetCollection){
      return list.arr.length;
    }
    else if(typeof list === "string"){
      return list.split("").length
    }
    throw new Error("Error de tipos.");
  }
}
