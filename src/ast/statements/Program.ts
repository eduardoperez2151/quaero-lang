import { Exp } from '../ASTNode';
import { Stmt } from '../ASTNode';
import { State } from '../../interpreter/State';
import { Function } from './Function';
import { Sequence } from '../AST';

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

  unParse(): string {
    return `@ ${this.functions.toString()}  Main { ${this.body.unParse()} } @`;
  }

  evaluate(state: State): any {
    state=this.functions.reduce((state:State,func:Stmt) => func.evaluate(state),state);
    state = this.body.evaluate(state);
    return state;
  }
}
