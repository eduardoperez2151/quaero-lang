import {Exp} from '../ASTNode';

import {State} from '../../interpreter/State';
import {AbstractExpression} from "./AbstractExpression";
import {ErrorTypeInfo} from "../ErrorTypeInfo";
import {Numeral} from "./Numeral";

export abstract class AbstractEnumerationCollection extends AbstractExpression {

    protected first: Exp;
    protected second: Exp;
    protected end: Exp;

    constructor(first: Exp, end: Exp, second?: Exp) {
        super();
        this.first = first;
        this.end = end;
        this.second = second ? second : new Numeral(NaN);

    }

    toString(): string {
        return `${this.constructor.name}(${this.first.toString() + " " + this.second.toString() + " " + this.end.toString()})`;
    }

    protected enumerationUnParsing(): string {
        return `(${this.first.unParse()} ${this.second.unParse()} ${this.end.unParse()} )`;
    }

    protected enumerationCalculate(state: State) {
        let firstEvaluation = this.first.evaluate(state);
        let secondEvaluation = this.second.evaluate(state);
        let endEvaluation = this.end.evaluate(state);
        if (this.isNumber(firstEvaluation) && this.isNumber(secondEvaluation) && this.isNumber(endEvaluation)) {
            let step = this.getStep(firstEvaluation, secondEvaluation);
            let list = [];
            if (firstEvaluation <= endEvaluation && step <= 0 || firstEvaluation > endEvaluation && step >= 0) {
                return list;
            }
            let current = firstEvaluation;
            while (this.checkFinish(firstEvaluation, current, endEvaluation)) {
                list.push(current);
                current = current + step;
            }
            return list;
        }
        let errors: [ErrorTypeInfo] = [new ErrorTypeInfo("firstEvaluation", firstEvaluation),
            new ErrorTypeInfo("secondEvaluation", secondEvaluation), new ErrorTypeInfo("endEvaluation", endEvaluation)];
        this.throwExceptionOnErrorCheckType(errors);
    }

    private checkFinish(first, act, end) {
        return first > end ? act >= end : act <= end;
    }

    private getStep(first, second) {
        if (isNaN(second)) second = first + 1;
        return second - first;
    }

}
