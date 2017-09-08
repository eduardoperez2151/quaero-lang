import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { Sequence } from './AST';

/**
  Representación de Programa.
*/
export class Program implements Exp {

  functions: [Function];
  body: Sequence;

  constructor(functions: [Function], body: Sequence) {
    this.functions = functions;
    this.body = body;
  }

  toString(): string {
    return `Program(${this.functions.toString()}, ${this.body.toString()})`;
  }

  unparse(): string { // Ver bien el unparse.
    return `@ ${this.functions.toString()}  { ${this.body.unparse()} } @`;
  }

  evaluate(state: State): any {
    /*
    var lres = this.lhs.evaluate(state);
    var rres = this.rhs.evaluate(state);
    return lres + rres;
    */
  }
}
