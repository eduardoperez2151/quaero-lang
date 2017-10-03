import { Exp } from './ASTNode';
import { ListCollection } from './AST';
import { SetCollection } from './AST';
import { State } from '../interpreter/State';

/**
  Representación de funcion boolean
*/
export class CBoolean implements Exp {
  exp: Exp;

  constructor(exp: Exp) {
    this.exp = exp;
  }

  toString(): string {
    return `CBoolean(${this.exp})`;
  }

  unparse(): string {
    return `boolean(${this.exp})`;
  }

  evaluate(state: State): any {
    var v = this.exp.evaluate(state);
    if (v === null)
      return false;
    if (v === "")
      return false;
    if (v === 0)
      return false;
    if (this.exp instanceof ListCollection && this.exp.arr.length === 0)
      return false;
    if (this.exp instanceof SetCollection && this.exp.arr.length === 0)
      return false;
    return true;
  }
}
