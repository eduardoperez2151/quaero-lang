import { Exp } from './ASTNode';
import { ListCollection,SetCollection,KeyValue} from './AST';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class Dot implements Exp {

  listCol: Exp;
  key: string;

  constructor(listCol: Exp, key: string, ) {
    this.key = key;
    this.listCol = listCol;
  }

  toString(): string {
    return `Dot(${this.listCol.toString()}, ${this.key.toString()})`;
  }

  unParse(): string {
    //return `(${this.lhs.unParse()} ++ ${this.rhs.unParse()})`;
    return "Hacer unParse";
  }

  evaluate(state: State): any {
    var list = this.listCol.evaluate(state)
    if(list instanceof ListCollection || list instanceof SetCollection){
      for(var i=0;i<list.arr.length;i++){
        var val = list.arr[i];
        if(val instanceof KeyValue && val.id == this.key) return val.exp
      }
    }
    throw new Error("Error de tipos.");
  }
}
