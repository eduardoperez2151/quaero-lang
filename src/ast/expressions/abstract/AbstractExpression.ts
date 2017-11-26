import {ErrorTypeInfo, Exp, ListCollection, SetCollection} from '../../AST';
import {State} from '../../../interpreter/State';
import {KeyValue} from "../KeyValue";
import {Variable} from "../../statements/Variable";


export abstract class AbstractExpression implements Exp {

    protected evaluateExpression(expression: Exp, state: State): any {
        return expression.evaluate(state);
    }

    protected isBoolean(expressionEvaluation: any): boolean {
        return typeof expressionEvaluation === "boolean";
    }

    protected isNumber(expressionEvaluation: any): boolean {
        return typeof expressionEvaluation === "number";
    }

    protected isString(expressionEvaluation: any): boolean {
        return typeof expressionEvaluation === "string";
    }

    protected isList(expressionEvaluation: any): boolean {
        return expressionEvaluation instanceof Array;
    }

    protected isSet(expressionEvaluation: any): boolean {
        return expressionEvaluation instanceof Set;
    }

    protected isCollection(expressionEvaluation: any): boolean {
        return this.isList(expressionEvaluation) || this.isSet(expressionEvaluation);
    }

    protected isKeyValue(expressionEvaluation: any): boolean {
        return expressionEvaluation instanceof KeyValue;
    }

    protected isVariable(expressionEvaluation: any): boolean {
        return expressionEvaluation instanceof Variable;
    }

    protected throwExceptionOnErrorCheckType(errorInfo: [ErrorTypeInfo]) {
        throw new EvalError(`\n######## ERROR DE TIPOS ########\n${errorInfo.join("\n") }\n################################`);
    }

    abstract toString(): string;

    abstract unParse(): string

    abstract evaluate(state: State): any;
}
