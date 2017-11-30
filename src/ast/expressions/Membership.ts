import {Exp} from '../ASTNode';
import {State} from '../../interpreter/State';
import {ErrorTypeInfo} from "../ErrorTypeInfo";
import {AbstractExpression} from "./abstract/AbstractExpression";
import {AbstractBinaryExpression} from "./abstract/AbstractBinaryExpression";
import {GenericBinaryOperation} from "./generic/GenericBinaryOperation";

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
        if (this.isString(listExpEvaluation)) {
          listExpEvaluation = listExpEvaluation.split("");
          listExpEvaluation["keyValues"] = new Map();
        }
        if (this.isCollection(listExpEvaluation)){
          return [...listExpEvaluation].some(item => AbstractBinaryExpression.deepEquals(valueEvaluation,item))
        }
        let errors:[ErrorTypeInfo] =[new ErrorTypeInfo("valueEvaluation", valueEvaluation),
            new ErrorTypeInfo("listExpEvaluation", listExpEvaluation)];
        this.throwExceptionOnErrorCheckType(errors);
    }
}
