import { Exp } from './ASTNode';
import { ListCollection, SetCollection, KeyValue} from './AST';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class Intersection implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Intersection(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unParse(): string {
    //return `(${this.lhs.unParse()} ++ ${this.rhs.unParse()})`;
    return "Hacer unParse";
  }

  evaluate(state: State): any {
    var lhs = this.lhs.evaluate(state);
    var rhs = this.rhs.evaluate(state);
    var inters = [];
    if(typeof lhs === "string")
      lhs = new ListCollection (lhs.split(""));
    if (typeof rhs === "string")
      rhs = new ListCollection (rhs.split(""));

    if((lhs instanceof SetCollection && rhs instanceof SetCollection)){
      inters = lhs.arr.filter(x => rhs.has(x,state));
      return new SetCollection(inters);
    }
    else{
      inters = lhs.arr.filter(x => rhs.has(x,state));
      return new ListCollection(inters);
    }
  }


    /* CODIGO QUE ESTABA ANTES, SE PUEDE BORRAR!!

    if(typeof lhs ==="string"){
      var l = lhs.split("");
      if(typeof rhs === "string"){
        var r = rhs.split("");
        inters = [...new Set(l)].filter(x => new Set(r).has(x));
        return new ListCollection(inters);
      }
      else if(rhs instanceof ListCollection || rhs instanceof SetCollection){
        inters = [...new Set(l)].filter(x => new Set(rhs.arr).has(x));
        return new ListCollection(inters);
      }
    }
    else if((lhs instanceof ListCollection || lhs instanceof SetCollection) && (rhs instanceof SetCollection || rhs instanceof ListCollection)){
      if((lhs instanceof SetCollection && rhs instanceof SetCollection)){
        inters = [...new Set(l)].filter(x => new Set(rhs.arr).has(x));
        return new SetCollection(inters);
      }
      inters = [...new Set(l)].filter(x => new Set(rhs.arr).has(x));
      return new ListCollection(inters);
    }
    else if((lhs instanceof ListCollection || lhs instanceof SetCollection) && rhs === "string"){
        r = rhs.split("");
        inters = [...new Set(l)].filter(x => new Set(rhs.arr).has(x));
        return new ListCollection(inters);
      }
    throw new Error("Error de tipos");
  }
  */
}
