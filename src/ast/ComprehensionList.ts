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
        let expressionsUnParse = this.expList
            .filter(exp => exp)
            .map(exp => exp.unParse())
            .join(",");
        return `comprehensionList (${this.forBody.unParse()},${expressionsUnParse})`;
    }

    evaluate(state: State): any {
        let resultList = [];
        this.comprehensionListEvaluation(state, this.expList, resultList);
        return new ListCollection(resultList);
    }

    private comprehensionListEvaluation(state: State, expList, resultList) {
        if (expList.length === 0) {
            resultList.push(this.forBody.evaluate(state));
        }
        let clonedState = state.clone();
        let [head, ...tail] = expList;
        if (head instanceof Membership) {
            if (head.value instanceof Variable) {
                let variable = head.value.id;
                let membershipList = head.listExp.evaluate(clonedState);
                membershipList.arr.forEach(membership => {
                    clonedState.set(variable, membership);
                    this.comprehensionListEvaluation(clonedState, tail, resultList);
                });
            }
        }

        if (head instanceof AbstractArithmeticBooleanOperation) {
            let condition = head.evaluate(clonedState);
            if ((typeof condition) == 'boolean' && condition) {
                this.comprehensionListEvaluation(clonedState, tail, resultList);
            }
        }
    }
}