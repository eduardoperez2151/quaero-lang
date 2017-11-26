import {Exp} from '../ASTNode';
import {State} from '../../interpreter/State';
import {AbstractExpression} from "./abstract/AbstractExpression";
import {ErrorTypeInfo} from "../ErrorTypeInfo";

export class Negation extends AbstractExpression {

    expression: Exp;

    constructor(expression: Exp) {
        super();
        this.expression = expression;
    }

    toString(): string {
        return `Negation(${this.expression.toString()})`;
    }

    unParse(): string {
        return `(!${this.expression.unParse()})`;
    }

    evaluate(state: State): any {
        let expressionEvaluation = this.expression.evaluate(state);
        if (this.isBoolean(expressionEvaluation)) {
            return !expressionEvaluation;
        }
        let errors: [ErrorTypeInfo] = [new ErrorTypeInfo("expression", expressionEvaluation)];
        super.throwExceptionOnErrorCheckType(errors);
    }
}
