import {Exp} from '../ASTNode';
import {State} from '../../interpreter/State';
import {ErrorTypeInfo} from "../ErrorTypeInfo";
import {AbstractExpression} from "./AbstractExpression";

export class Membership extends AbstractExpression {

    listExp: Exp;
    value: Exp;

    constructor(value: Exp, listExp: Exp) {
        super();
        this.value = value;
        this.listExp = listExp;
    }

    toString(): string {
        return `Membership(${this.value.toString()}, ${this.listExp.toString()})`;
    }

    unParse(): string {
        return `membership (${this.value.unParse()},${this.listExp.unParse()},)`;
    }

    evaluate(state: State): any {
        let listExpEvaluation = this.evaluateExpression(this.listExp,state);
        let valueEvaluation =  this.evaluateExpression(this.value,state);
        if (this.isCollection(listExpEvaluation)) {
            return listExpEvaluation.arr.some(expression =>
                expression === valueEvaluation || (this.isKeyValue(expression) && expression.exp === valueEvaluation));
        } else if (this.isString(listExpEvaluation)) {
            let stringEvaluation= listExpEvaluation.split("");
            return stringEvaluation.includes(valueEvaluation);
        }
        let errors:[ErrorTypeInfo] =[new ErrorTypeInfo("valueEvaluation", valueEvaluation),
            new ErrorTypeInfo("listExpEvaluation", listExpEvaluation)];
        this.throwExceptionOnErrorCheckType(errors);
    }
}
