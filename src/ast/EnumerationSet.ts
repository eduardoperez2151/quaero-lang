import { Exp } from './ASTNode';
import { Numeral,SetCollection } from './AST';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class EnumerationSet implements Exp {

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
    return `EnumerationSet(${this.toString()})`;
  }

  unparse(): string {
    //return `(${this.lhs.unparse()} + ${this.rhs.unparse()})`;
     return "Hacer unparse()";
  }
  evaluate(state: State): any {
    var srt = this.srt.evaluate(state);
    var end = this.end.evaluate(state);
    var stp = this.stp.evaluate(state);
    if(srt >= end && stp>0){return new SetCollection([]);}
    if(srt <= end && stp<0){return new SetCollection([]);}
    if(typeof srt === "number" && typeof end  === "number" && typeof stp === "number"){
      let list: any[]= [];
      if(srt < end){
        for(var i = srt;i<= end;i = i+stp){
          list.push(i);
        }
      }else{
        for(var i = srt;i>= end;i = i+stp){
          list.push(i);
        }
      }
      return new SetCollection(list);
    }
    throw new Error("Error de tipos");
  }
}
