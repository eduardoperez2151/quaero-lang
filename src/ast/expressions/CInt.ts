import {Exp} from '../ASTNode';
import {State} from '../../interpreter/State';
import {ErrorTypeInfo} from "../ErrorTypeInfo";
import {AbstractExpression} from "./AbstractExpression";

export class CInt extends AbstractExpression {
    expression: Exp;

    constructor(expression: Exp) {
        super();
        this.expression = expression;
    }

    toString(): string {
        return `CInt(${this.expression.toString()})`;
    }

    unParse(): string {
        return `int(${this.expression.unParse()})`;
    }

    evaluate(state: State): any {
        let evaluation = this.expression.evaluate(state);
        if (this.isString(evaluation) || this.isNumber(evaluation)){
            return parseInt((evaluation as any));
        }
        let error = new ErrorTypeInfo("evaluation", evaluation);
        this.throwExceptionOnErrorCheckType([error]);
    }
}
