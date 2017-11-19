import {State} from '../../interpreter/State';
import {ErrorTypeInfo} from "./../AST";
import {AbstractExpression} from "./AbstractExpression";

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
