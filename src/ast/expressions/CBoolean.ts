import {Exp} from '../ASTNode';
import {State} from '../../interpreter/State';
import {AbstractExpression} from "./AbstractExpression";

export class CBoolean extends AbstractExpression {

    expression: Exp;

    constructor(expression: Exp) {
        super();
        this.expression = expression;
    }

    toString(): string {
        return `CBoolean(${this.expression.toString()})`;
    }

    unParse(): string {
        return `boolean(${this.expression.unParse()})`;
    }

    evaluate(state: State): any {
        let evaluation = this.expression.evaluate(state);
        switch (evaluation) {
            case null:
            case "":
            case 0:
                return false;
            default:
                return !(this.isCollection(this.expression) && evaluation.arr.length === 0);
        }
    }
}
