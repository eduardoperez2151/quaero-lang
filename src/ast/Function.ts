import { Exp, Stmt} from './ASTNode';
import { State } from '../interpreter/State';
import { Sequence } from './AST';

/**
  Representación de funciones.
*/
export class Function implements Stmt {

  identifier: string;
  body:Sequence;
  params:[String];

  constructor(identifier: string, params: [String], body: Sequence) {
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

  evaluate(state: State): State {
    state.set(this.identifier,this);
    return state;
  }
}
