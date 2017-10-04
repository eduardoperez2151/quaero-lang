import { Exp } from './ASTNode';
import { KeyValue } from './AST';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class SetCollection implements Exp {

  arr: Array<any>;

  constructor(arr?: Array<any>) {
    if (arr){
      arr = [...new Set(arr)]
      for (var i = 0; i<arr.length;i++){
        for(var j = i+1;j<arr.length;j++){
          if(arr[i] instanceof KeyValue && arr[j] instanceof KeyValue && arr[i].id === arr[j].id){
            throw new Error("Hay elementos con claves repetidas");
          }
        }
      }
    this.arr = arr;
  }
    else{
      this.arr = new Array<any>();
    }
  }
  toString(): string {
    return `SetCollection(${this.arr.toString()})`;
  }

  unparse(): string {
    //return `(${this.lhs.unparse()} + ${this.rhs.unparse()})`;
     return "Hacer unparse()";
  }
  evaluate(state: State): any {
    let ev: any[]= this.arr.map(function(value){return value.evaluate(state);});
    return new SetCollection(ev);
  }
}
