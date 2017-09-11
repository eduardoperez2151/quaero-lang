import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';
import { Sequence } from './AST';
import { Function } from './Function'

export class CallFunction implements Exp {

  identifier: string;
  params: [Exp];

  constructor(identifier: string, params: [Exp]) {
    this.identifier = identifier;
    this.params = params;
  }

  toString(): string {
    return `CallFunction(${this.identifier} , ${this.params.toString()})`;
  }

  unparse(): string {
    var params = this.params.join(",");
    return `function ${this.identifier} (${params}) `;
  }

  evaluate(state: State): any {
    var func: Function = state.get(this.identifier);
    var functionState = state.clone();
    var functionArgs=func.args;
    for (var index = 0; index < this.params.length; index++) {
      functionState.set(functionArgs[index],this.params[index]);
    }
    return func.body.evaluate(functionState)
  }
}
