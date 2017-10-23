import {Exp} from '../ASTNode';
import {State} from '../../interpreter/State';
import {ErrorTypeInfo} from "../ErrorTypeInfo";
import {AbstractExpression} from "./AbstractExpression";

export abstract class AbstractBinaryExpression extends AbstractExpression {

    protected leftHandSide: Exp;
    protected rightHandSide: Exp;
    protected operationSymbol: string;

    protected constructor(leftHandSide: Exp, rightHandSide: Exp, operationSymbol: string) {
        super();
        this.leftHandSide = leftHandSide;
        this.rightHandSide = rightHandSide;
        this.operationSymbol = operationSymbol;
    }

    protected leftHandSideEvaluation(state: State): any {
        return this.evaluateExpression(this.leftHandSide, state);
    }

    protected rightHandSideEvaluation(state: State): any {
        return this.evaluateExpression(this.rightHandSide, state);
    }

    protected ThrowEvaluationException(rightHandSideEvaluation: any, leftHandSideEvaluation: any) {
        let errors: [ErrorTypeInfo] = [new ErrorTypeInfo("rightHandSide", rightHandSideEvaluation), new ErrorTypeInfo("leftHandSide", leftHandSideEvaluation)];
        super.throwExceptionOnErrorCheckType(errors);
    }

    toString(): string {
        return `${this.constructor.name}(${this.leftHandSide.toString()}, ${this.rightHandSide.toString()})`;
    }

    unParse(): string {
        return `(${this.leftHandSide.unParse()} ${this.operationSymbol} ${this.rightHandSide.unParse()})`;
    }

}
