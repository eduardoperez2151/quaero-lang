import { Exp, Stmt} from './ASTNode';
import { State } from '../interpreter/State';
import { Sequence } from './AST';

export class Function implements Stmt {

  identifier: string;
  body:Sequence;
  args:[string];

  constructor(identifier: string, args: [string], body: Sequence) {
    this.identifier = identifier;
    this.args = args;
    this.body = body;
  }

  toString(): string {
    return `Function(${this.identifier} , ${this.args.toString()} , ${this.body.toString()})`;
  }

  unparse(): string {
    var args = this.args.join(",");
    return `function ${this.identifier} (${args}) { ${this.body.unparse()}}`;
  }

  evaluate(state: State): State {
    state.set(this.identifier,this);
    return state;
  }
}
