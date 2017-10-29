import {Exp} from "../ASTNode";
import {Variable} from "../statements/Variable";
import {Membership} from "./Membership";
import {State} from "../../interpreter/State";
import {AbstractExpression} from "./AbstractExpression";
import {AbstractArithmeticBooleanOperation} from "./AbstractArithmeticBooleanOperation";

export abstract class AbstractComprehension extends AbstractExpression {

    protected expList: [Exp];
    protected forBody: Exp;

    constructor(forBody: Exp, expList: [Exp]) {
        super();
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
        return `${this.constructor.name} (${this.forBody.unParse()},${expressionsUnParse})`;
    }

    protected comprehensionEvaluation(state:State){
        let resultList = [];
        this.comprehensionCalculate(state, this.expList, resultList);
        return resultList;
    }

    private comprehensionCalculate(state: State, expList, resultList) {
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
                    this.comprehensionCalculate(clonedState, tail, resultList);
                });
            }
        }

        if (head instanceof AbstractArithmeticBooleanOperation) {
            let condition = head.evaluate(clonedState);
            if (this.isBoolean(condition) && condition) {
                this.comprehensionCalculate(clonedState, tail, resultList);
            }
        }
    }
}