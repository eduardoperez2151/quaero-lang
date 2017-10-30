import {Exp} from '../ASTNode';
import {State} from '../../interpreter/State';
import {AbstractExpression} from "./AbstractExpression";
import {ErrorTypeInfo} from "../ErrorTypeInfo";

export class Numeral extends AbstractExpression {

    value: number;

    constructor(value: number) {
        super();
        this.value = value;
    }

    toString(): string {
        return `Numeral(${this.value})`;
    }

    unParse(): string {
        return `${this.value}`;
    }

    evaluate(state: State): number {
        if (this.isNumber(this.value)) {
            return this.value;
        }
        let error: [ErrorTypeInfo] = [new ErrorTypeInfo("value", this.value)];
        this.throwExceptionOnErrorCheckType(error);
    }
}
