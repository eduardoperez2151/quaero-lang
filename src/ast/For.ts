import { Exp, Stmt} from './ASTNode';
import { State } from '../interpreter/State';
import { Sequence,Membership,Variable } from './AST';

/**
  Representación de for .
*/
export class For implements Stmt {

  expList: [Exp];
  forBody: Stmt;

  constructor(expList: [Exp], forBody: Stmt) {
    this.expList = expList;
    this.forBody = forBody;
  }

  toString(): string {
    return `For(${this.expList.toString()} , ${this.forBody.toString()})}`;
  }

  unparse(): string {
    return "unparse";
    //return `for ${this.expList.unparse()} {${this.forBody.unparse()}}`;
  }
  putarecursion(memberships:Membership[],booleans:Exp[],state:State): State{
    let mem : Membership = memberships[0];
    let nMembers = memberships.slice(1);
    var v = (mem.value as Variable).id;
    let list = mem.listCol.evaluate(state).arr;
    if(nMembers.length > 0){
      for (var j = 0;j<list.length;j++){
        state.set(v,list[j]);
        state = this.putarecursion(nMembers,booleans,state);
      }
    }
    else{
      for(var i = 0;i<list.length;i++){
        state.set(v,list[i]);
        for(var j =0;j<booleans.length;j++){
          if(!(booleans[j].evaluate(state))){
            state.vars.delete(v);
            return state;
          }
        }
        state = this.forBody.evaluate(state);
      }
    }
    state.vars.delete(v);
    return state;
  }
  evaluate(state: State): State {
    let memberships : Membership[] = [];
    let booleans : Exp[] = [];
    for(var i = 0;i<this.expList.length;i++){
      var m = this.expList[i]
      if(m instanceof Membership){
        memberships.push(m);
      }else{
        booleans.push(m);
      }
    }
    return this.putarecursion(memberships.reverse(),booleans,state);
  }
}
