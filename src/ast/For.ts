import { Exp, Stmt} from './ASTNode';
import { State } from '../interpreter/State';
import { Sequence } from './AST';

/**
  Representación de for .
*/
export class For implements Stmt {

  expList: [Exp];
  forBody: [Stmt];

  constructor(expList: [Exp], forBody: [Stmt]) {
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

  evaluate(state: State): any {
    /*
    var lres = this.lhs.evaluate(state);
    var rres = this.rhs.evaluate(state);
    return lres + rres;
    */
  }
}
