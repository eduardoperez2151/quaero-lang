import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

export class Index implements Exp {

  value: Exp;
  indexValue: Exp;

  constructor(value: Exp, indexValue: Exp) {
    this.value = value;
    this.indexValue = indexValue;
  }

  toString(): string {
    return `IndexOf(${this.value.toString()},[ ${this.indexValue.toString()}])`;
  }

  unparse(): string {
    return `${this.value.unparse()}[${this.indexValue.unparse()}]`;
  }

  evaluate(state: State): any {
    var str = this.value.evaluate(state);
    var index = this.indexValue.evaluate(state);
    if (typeof str === "string" &&  typeof index === "number"){
      return str[index];
    }
    throw new EvalError("Error de tipos.");
  }
}
