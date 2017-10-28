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

  unParse(): string {
    //return `(${this.lhs.unParse()} + ${this.rhs.unParse()})`;
     return "Hacer unParse()";
  }
  evaluate(state: State): any {
    let ev: any[]= this.arr.map(function(value){return value.evaluate(state);});
    return new SetCollection(ev);
  }
  // Los métodos has y processItems se repite en ListCollection y SetCollection
  // se podria quitar para una tercera clase.
  has(item:any, state:State):boolean{
    // True si this.arr contine al item, false si no contine al item.
    if (item instanceof KeyValue){
      for (var i = 0; i < this.arr.length; i++){
        if (this.arr[i] instanceof KeyValue){
          var kv = this.arr[i];
          if (kv.exp === item.exp && kv.id === item.id)
            return true;
          }
        }
        return false;
      }else{
        var arrSet = new Set(this.arr);
        return arrSet.has(item);
      }
    }

    processItems():Array<any>{
      var ev: any[]= this.arr.map(function(value){
         return (value instanceof KeyValue) ? value.exp : value;});
      return ev;
    }
}
