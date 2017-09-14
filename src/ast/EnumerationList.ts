import { Exp } from './ASTNode';
import { Numeral,ListCollection } from './AST';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class EnumerationList implements Exp {

  srt: Exp;
  stp: Exp;
  end: Exp;

  constructor(srt:Exp,end:Exp,stp?:Exp) {
    this.srt = srt;
    this.end = end;
    if(stp){
      this.stp = stp;
    }else{
      this.stp = new Numeral(1);
    }
  }
  toString(): string {
    return `EnumerationList(${this.toString()})`;
  }

  unparse(): string {
    //return `(${this.lhs.unparse()} + ${this.rhs.unparse()})`;
     return "Hacer unparse()";
  }
  evaluate(state: State): any {
    var srt = this.srt.evaluate(state);
    var end = this.end.evaluate(state);
    var stp = this.stp.evaluate(state);
    if(srt >= end && stp>0){return new ListCollection([]);}
    if(srt <= end && stp<0){return new ListCollection([]);}
    if(typeof srt === "number" && typeof end  === "number" && typeof stp === "number"){
      let list: any[]= [];
      if(srt < end){
        for(var i = srt;i<= end;i = i+stp){
          list.push(i);
        }
      }else{
        //stp = stp*-1; #<- si no admitimos negativos
        for(var i = srt;i>= end;i = i+stp){
          list.push(i);
        }
      }
      return new ListCollection(list);
    }
    throw new Error("Error de tipos");
  }
}
