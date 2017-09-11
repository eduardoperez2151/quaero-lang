import { Exp, Stmt} from './ASTNode';
import { State } from '../interpreter/State';
import { Sequence,Membership,Variable,SetCollection } from './AST';

/**
  Representación de ComprehensionList .
*/
export class ComprehensionSet implements Exp {

  expList: [Exp];
  forBody: Exp;

  constructor(forBody: Exp,expList: [Exp]) {
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
  calculate(memberships:Membership[],booleans:Exp[],state:State): State{
    let mem : Membership = memberships[0];
    let nMembers = memberships.slice(1);
    var v = (mem.value as Variable).id;
    let list = mem.listCol.evaluate(state).arr;
    if(nMembers.length > 0){
      for (var j = 0;j<list.length;j++){
        state.set(v,list[j]);
        state = this.calculate(nMembers,booleans,state);
      }
    }
    else{
      for(var i = 0;i<list.length;i++){
        state.set(v,list[i]);
        for(var j =0;j<booleans.length;j++){
          if(!(booleans[j].evaluate(state))){
            return state;
          }
        }
        state.get("#resultado").push(this.forBody.evaluate(state));
      }
    }
    return state;
  }
  evaluate(state: State): any {
    let memberships : Membership[] = [];
    let booleans : Exp[] = [];
    var nState = state.clone().clone();
    nState.set("#resultado",[]);
    for(var i = 0;i<this.expList.length;i++){
      var m = this.expList[i]
      if(m instanceof Membership){
        memberships.push(m);
      }else{
        booleans.push(m);
      }
    }
    nState = this.calculate(memberships.reverse(),booleans,nState);
    var lista = nState.get("#resultado");
    return new SetCollection(lista);
  }
}
