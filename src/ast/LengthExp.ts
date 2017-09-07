import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Expresión que devuelve el largo de un string.
*/
export class LengthExp implements  Exp {
    exp:Exp;

  constructor(exp:Exp) {
    this.exp = exp;
    console.log(exp);
  }

  toString(): string {
    return `LengthExp(${this.exp.toString()})`;
  }

  unparse(): string {
    return `LengthExp(${this.exp.unparse()})`;
  }

  evaluate(state: State): any {
    var str = this.exp.evaluate(state);
    if (typeof str === "string") {
        return str.length;
    }
    throw new EvalError("Error al evaluar la exprexion: debe ser de tipo string");
  }
}
