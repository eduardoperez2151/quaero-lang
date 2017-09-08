import { Exp, Stmt} from './ASTNode';
import { State } from '../interpreter/State';
import { Sequence } from './AST';

/**
  Representación de funciones.
*/
export class Function implements Stmt {

  identifier: String;
  body:Sequence;
  params:[String];

  constructor(identifier: String, params: [String], body: Sequence) {
    this.identifier = identifier;
    this.params = params;
    this.body = body;
  }

  toString(): string {
    return `Function(${this.identifier} , ${this.params.toString()} , ${this.body.toString()})`;
  }

  unparse(): string {
    var params = this.params.toString();
    var params = params.substring(1,params.length - 1); // Se quitan []
    return `function ${this.identifier} (${params}) { ${this.body.unparse()}}`;
  }

  evaluate(state: State): any {
    /*
    var lres = this.lhs.evaluate(state);
    var rres = this.rhs.evaluate(state);
    return lres + rres;
    */
  }
}
