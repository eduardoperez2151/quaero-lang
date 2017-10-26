import {AbstractArithmeticBooleanOperation} from './expressions/AbstractArithmeticBooleanOperation';
import {Exp} from './ASTNode';
import {State} from '../interpreter/State';
import { ListCollection, Membership, Variable } from './AST';

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

    unParse(): string {
        return "unParse";
        //return `for ${this.expList.unParse()} {${this.forBody.unParse()}}`;
    }

    evaluate(state: State): any {
        console.log("original= " + this.expList);
        let resultList = [];
        this.comprenhentionListEvaluation(state, this.expList, resultList);
        return new ListCollection(resultList);
    }

    private comprenhentionListEvaluation(state: State, expList, resultList) {

        console.log(expList);
        if (expList.length == 0) {
            resultList.push(this.forBody.evaluate(state));
        }
        let clonedState = state.clone();
        let headExpression = expList[(expList.length - 1)];
        let expListTail = expList.slice(0, (expList.length - 1));
        console.log(headExpression);
        console.log(expListTail);
        if (headExpression instanceof Membership) {
            if (headExpression.value instanceof Variable) {
                let variable = headExpression.value.id;
                let membershipList = headExpression.listExp.evaluate(clonedState);
                console.log(membershipList.arr);
                membershipList.arr.forEach(membership => {
                    clonedState.set(variable, membership);
                    this.comprenhentionListEvaluation(clonedState, expListTail, resultList);
                });
            }
        }

        if (headExpression instanceof AbstractArithmeticBooleanOperation) {
            let condition = headExpression.evaluate(clonedState);
            if ((typeof condition) == 'boolean' && condition) {
                this.comprenhentionListEvaluation(clonedState, expListTail, resultList);
            }
        }
    }
}