import { Exp, Stmt} from './ASTNode';
import { State } from '../interpreter/State';
import {AbstractArithmeticBooleanOperation} from './expressions/AbstractArithmeticBooleanOperation'
import { Sequence,Membership,Variable } from './AST';

/**
  Representación de for .
*/
export class For implements Stmt {

  expList: [Exp];
  forBody: Stmt;

  constructor(expList: [Exp], forBody: Stmt) {
    this.expList = expList;
    this.forBody = forBody;
  }

  toString(): string {
    return `For(${this.expList.toString()} , ${this.forBody.toString()})}`;
  }

  unParse(): string {
    return "unParse";
    //return `for ${this.expList.unParse()} {${this.forBody.unParse()}}`;
  }
  calculate(state: State, expList) {
    if(state.get("return")) return state;
    if (expList.length === 0) {
        this.forBody.evaluate(state);
    }
    let [head, ...tail] = expList;
    if (head instanceof Membership) {
        if (head.value instanceof Variable) {
            let variable = head.value.id;
            let membershipList = head.listExp.evaluate(state);
            membershipList.arr.forEach(membership => {
                state.set(variable, membership);
                state = this.calculate(state, tail);
            });
        }
    }

    if (head instanceof AbstractArithmeticBooleanOperation) {
        let condition = head.evaluate(state);
        if (typeof condition === "boolean" && condition) {
            state = this.calculate(state, tail);
        }
    }
    return state;
  }
  evaluate(state: State): State {
    return this.calculate(state,this.expList);
  }
}
