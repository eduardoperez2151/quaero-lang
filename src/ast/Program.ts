import { Exp } from './ASTNode';
import { Stmt } from './ASTNode';
import { State } from '../interpreter/State';
import { Sequence } from './AST';

/**
  Representación de Programa.
*/
export class Program implements Stmt {

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
    let functions: Array<Function> = this.functions;
    for (let func of functions){
      state = (func as any).evaluate(state); 
    }
    // Evaluar el bloque ...
    state = this.body.evaluate(state);
    return state;
  }
}
