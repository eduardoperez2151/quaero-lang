import {Exp} from '../ASTNode';
import {State} from '../../interpreter/State';
import {ErrorTypeInfo} from "../ErrorTypeInfo";
import {AbstractExpression} from "./AbstractExpression";

export class CNumber extends AbstractExpression {
    expression: Exp;

    constructor(expression: Exp) {
        super();
        this.expression = expression;
    }

    toString(): string {
        return `CNumber(${this.expression.toString()})`;
    }

    unParse(): string {
        return `number(${this.expression.unParse()})`;
    }

    evaluate(state: State): any {
        let evaluation = this.expression.evaluate(state);
        if (this.isString(evaluation) || this.isNumber(evaluation)) {
            return Number(evaluation);
        }
        let error = new ErrorTypeInfo("evaluation", evaluation);
        this.throwExceptionOnErrorCheckType([error]);
    }
}