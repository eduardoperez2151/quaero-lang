import { Exp } from './ASTNode';
import { ListCollection,SetCollection,KeyValue } from './AST';
import { State } from '../interpreter/State';

export class Index implements Exp {

  value: Exp;
  indexValue: Exp;

  constructor(value: Exp, indexValue: Exp) {
    this.value = value;
    this.indexValue = indexValue;
  }

  toString(): string {
    return `IndexOf(${this.value.toString()},[ ${this.indexValue.toString()}])`;
  }

  unParse(): string {
    return `${this.value.unParse()}[${this.indexValue.unParse()}]`;
  }

  evaluate(state: State): any {
    var list = this.value.evaluate(state);
    var index = this.indexValue.evaluate(state);
    if (typeof index === "number"){
      if(typeof list === "string"){
        return list[index];
      }
      else if(list instanceof ListCollection){
        return list.arr[index];
      }
    }
    else if(typeof index == "string" && (list instanceof ListCollection || list instanceof SetCollection)){
      for(var i=0;i<list.arr.length;i++){
        var val = list.arr[i];
        if(val instanceof KeyValue && val.id == index) return val.exp
      }
    }
    throw new Error("Error de tipos.");
  }
}
