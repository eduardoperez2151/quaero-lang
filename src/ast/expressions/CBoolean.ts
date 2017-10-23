import {Exp} from '../ASTNode';
import {State} from '../../interpreter/State';
import {AbstractExpression} from "./AbstractExpression";
import {TruthValue} from "../TruthValue";

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
                return new TruthValue(false);
            default:
                return new TruthValue(!(this.isCollection(this.expression) && evaluation.arr.length === 0));
        }
    }
}
