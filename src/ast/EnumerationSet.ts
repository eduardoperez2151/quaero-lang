import { Exp } from './ASTNode';
import { Numeral,SetCollection } from './AST';
import { State } from '../interpreter/State';

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

  unParse(): string {
    //return `(${this.lhs.unParse()} + ${this.rhs.unParse()})`;
     return "Hacer unParse()";
  }
  evaluate(state: State): any {
    var srt = this.srt.evaluate(state);
    var end = this.end.evaluate(state);
    var stp = this.stp.evaluate(state);
    if(typeof srt === "number" && typeof end  === "number" && typeof stp === "number"){
      let list: any[]= [];
      if(srt < end){
        stp = stp - srt;
        if(stp < 0)return new SetCollection([]);
        for(var i = srt;i<= end;i = i+stp){
          list.push(i);
        }
      }else{
        stp = srt - stp;
        if(stp < 0)return new SetCollection([]);
        for(var i = srt;i>= end;i = i-stp){
          list.push(i);
        }
      }
      return new SetCollection(list);
    }
    throw new Error("Error de tipos");
  }
}
