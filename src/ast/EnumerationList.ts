import { Exp } from './ASTNode';
import { Numeral, ListCollection } from './AST';
import { State } from '../interpreter/State';

/**
 Representación de sumas.
 */
export class EnumerationList implements Exp {

  first: Exp;
  second: Exp;
  end: Exp;

  constructor(first: Exp, end: Exp, second?: Exp) {
    this.first = first;
    this.end = end;
    if (second) {
      this.second = second;
    } else {
      this.second = new Numeral(NaN);
    }
  }

  toString(): string {
    return `EnumerationList(${this.first.toString() + " " + this.second.toString() + " " + this.end.toString()})`;
  }

  unparse(): string {
    //return `(${this.lhs.unparse()} + ${this.rhs.unparse()})`;
    return "Hacer unparse()";
  }

  evaluate(state: State): any {
    var first = this.first.evaluate(state);
    var second = this.second.evaluate(state);
    var end = this.end.evaluate(state);
    if (typeof first === "number" && typeof end === "number" && typeof second === "number") {
      var step = this.getStep(first, second);
      let list: any[] = [];
      if (first <= end && step <= 0 || first > end && step >= 0) {
        return new ListCollection([]);
      }
      var act = first;
      while (this.checkFinish(first, act, end)) {
        list.push(act);
        act = act + step;
      }
      return new ListCollection(list);
    }
    throw new Error("Error de tipos");
  }

  checkFinish(first, act, end) {
    if (first > end) {
      return act >= end;
    } else {
      return act <= end;
    }
  }

  getStep(first, second) {
    if (isNaN(second))
      second = first + 1;
    return second - first;
  }
}
