import {Exp} from '../ASTNode';
import {State} from '../../interpreter/State';
import {ErrorTypeInfo} from "../ErrorTypeInfo";
import {AbstractExpression} from "./AbstractExpression";

export class Index extends AbstractExpression {

    value: Exp;
    indexValue: Exp;

    constructor(value: Exp, indexValue: Exp) {
        super();
        this.value = value;
        this.indexValue = indexValue;
    }

    toString(): string {
        return `IndexOf(${this.value.toString()},[ ${this.indexValue.toString()}])`;
    }

    unParse(): string {
        return `${this.value.unParse()}[${this.indexValue.unParse()}]`;
    }

    evaluate(state: State): any {
        let listEvaluation = this.value.evaluate(state);
        let indexEvaluation = this.indexValue.evaluate(state);
        if (this.isNumber(indexEvaluation)) {
            if (this.isString(listEvaluation)) {
                return listEvaluation[indexEvaluation];
            } else if (this.isList(listEvaluation)) {
                return listEvaluation.arr[indexEvaluation];
            }
        } else if (this.isString(indexEvaluation) && this.isCollection(listEvaluation)) {
            for (let item of listEvaluation.arr) {
                if (this.isKeyValue(item) && item.id === indexEvaluation) {
                    return item.exp;
                }
            }
        }
        let errors: [ErrorTypeInfo] = [new ErrorTypeInfo("listEvaluation", listEvaluation), new ErrorTypeInfo("indexEvaluation", indexEvaluation)];
        super.throwExceptionOnErrorCheckType(errors);
    }
}
