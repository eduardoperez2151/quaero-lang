import { Exp } from './ASTNode';
import { ListCollection, SetCollection,KeyValue } from './AST';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class Membership implements Exp {

  listCol: Exp;
  value: Exp;

  constructor(value: Exp, listCol: Exp) {
    this.value = value;
    this.listCol = listCol;
  }

  toString(): string {
    return `Membership(${this.value.toString()}, ${this.listCol.toString()})`;
  }

  unparse(): string {
    //return `(${this.lhs.unparse()} ++ ${this.rhs.unparse()})`;
    return "Hacer unparse";
  }

  evaluate(state: State): any {
    var listCol = this.listCol.evaluate(state);
    var value = this.value.evaluate(state);
    if(listCol instanceof ListCollection || listCol instanceof SetCollection ){
       for(var i = 0;i<listCol.arr.length;i++){
         if(listCol.arr[i] == value){
           return true;
         }
         else if(listCol.arr[i] instanceof KeyValue && listCol.arr[i].exp== value){
           return true;
         }
       }
       return false;
    }
    else if (typeof listCol === "string"){
      listCol = listCol.split("");
      return listCol.includes(value);
    }
    throw new Error("Error de tipos.");
  }
}
