import { AbstractArimeticBooleanOperation } from './AbstractArimeticBooleanOperation';
import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';
import { Sequence, Membership, Variable, ListCollection } from './AST';

/**
  Representación de ComprehensionList .
*/
export class ComprehensionList implements Exp {

  expList: [Exp];
  forBody: Exp;

  constructor(forBody: Exp, expList: [Exp]) {
    this.expList = expList;
    this.forBody = forBody;
  }

  toString(): string {
    return `For(${this.expList.toString()} , ${this.forBody.toString()})}`;
  }

  unparse(): string {
    return "unparse";
    //return `for ${this.expList.unparse()} {${this.forBody.unparse()}}`;
  }

  evaluate(state: State): any {
    console.log("original= " + this.expList);
    let resultList = [];
    this.comprenhentionListEvaluation(state, this.expList, resultList);
    return resultList;
  }

  private comprenhentionListEvaluation(state: State, expList, resultList) {
    if (expList.length == 0) {

      resultList.push(this.forBody.evaluate(state));
    }
    let clonedState = state.clone();
    let headExpression = expList[(expList.length - 1)];
    let expListTail = expList.slice(0, (expList.length - 1));
    if (headExpression instanceof Membership) {
      if (headExpression.value instanceof Variable) {
        let variable = headExpression.value.id;
        let membershipList = headExpression.listCol.evaluate(clonedState);
        membershipList.arr.forEach(membership => {
          clonedState.set(variable, membership);
          this.comprenhentionListEvaluation(clonedState, expListTail, resultList);
        });

      }
    }

    if (headExpression instanceof AbstractArimeticBooleanOperation) {
      let condition = headExpression.evaluate(clonedState);
      if ((typeof condition) == 'boolean' && condition) {
        this.comprenhentionListEvaluation(clonedState, expListTail, resultList);
      }
    }
  }
}