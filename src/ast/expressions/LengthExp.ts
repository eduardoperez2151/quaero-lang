import {Exp} from '../ASTNode';
import {State} from '../../interpreter/State';
import {AbstractExpression} from "./abstract/AbstractExpression";
import {ErrorTypeInfo} from "../ErrorTypeInfo";

export class LengthExp extends AbstractExpression {
    exp: Exp;

    constructor(exp: Exp) {
        super();
        this.exp = exp;
    }

    toString(): string {
        return `LengthExp(${this.exp.toString()})`;
    }

    unParse(): string {
        return `LengthExp(${this.exp.unParse()})`;
    }

    evaluate(state: State): any {
        let expressionEvaluation = this.exp.evaluate(state);
        if (this.isString(expressionEvaluation)) {
            return expressionEvaluation.length;
        }
        let error: [ErrorTypeInfo] = [new ErrorTypeInfo("expressionEvaluation", expressionEvaluation)];
        super.throwExceptionOnErrorCheckType(error);
    }
}
