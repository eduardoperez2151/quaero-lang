import {Exp} from '../ASTNode';
import {State} from '../../interpreter/State';
import {ErrorTypeInfo} from "../ErrorTypeInfo";
import {AbstractExpression} from "./AbstractExpression";

export class Membership extends AbstractExpression {

    listExp: Exp;
    value: Exp;

    constructor(value: Exp, listExp: Exp) {
        super();
        this.value = value;
        this.listExp = listExp;
    }

    toString(): string {
        return `Membership(${this.value.toString()}, ${this.listExp.toString()})`;
    }

    unParse(): string {
        return `membership (${this.value.unParse()},${this.listExp.unParse()},)`;
    }

    evaluate(state: State): any {
        let listExpEvaluation = this.listExp.evaluate(state);
        let valueEvaluation =  this.value.evaluate(state);
        if (this.isList(listExpEvaluation)) {
            return listExpEvaluation.includes(valueEvaluation);
        } else if(this.isSet(listExpEvaluation)){
            return listExpEvaluation.has(valueEvaluation);
        }else if (this.isString(listExpEvaluation)) {
            let stringEvaluation= listExpEvaluation.split("");
            return stringEvaluation.includes(valueEvaluation);
        }
        let errors:[ErrorTypeInfo] =[new ErrorTypeInfo("valueEvaluation", valueEvaluation),
            new ErrorTypeInfo("listExpEvaluation", listExpEvaluation)];
        this.throwExceptionOnErrorCheckType(errors);
    }
}
