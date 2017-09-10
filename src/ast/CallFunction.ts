import { Exp, Stmt} from './ASTNode';
import { State } from '../interpreter/State';
import { Sequence } from './AST';
import {Function} from './Function'

/**
  Representación de llamada de funcion.
*/
export class CallFunction implements Stmt {

  identifier: string;
  params:[Exp];

  constructor(identifier: string, params: [Exp]) {
    this.identifier = identifier;
    this.params = params;
  }

  toString(): string {
    return `CallFunction(${this.identifier} , ${this.params.toString()})`;
  }

  unparse(): string {
    var params = this.params.toString();
    var params = params.substring(1,params.length - 1); // Se quitan []
    return `function ${this.identifier} (${params}) `;
  }

  evaluate(state: State): any {
    var func :Function = state.get(this.identifier);
    
    // Asignar los valores que se pasan por parametro
    // a los parametros de la funcion en el estado
    // y llamar al body.evaluate(state)??
    //return state;
  }
}
