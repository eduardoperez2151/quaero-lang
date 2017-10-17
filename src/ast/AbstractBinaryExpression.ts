import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { AbstractExpression } from "./AbstractExpression";
import ErrorTypeInfo from "./ErrorTypeInfo";

/**
  Representación abstracta de una expresion binarias.
*/
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

  protected leftHandSideEvaluation(state:State):any{
    return this.evaluateExpression(this.leftHandSide,state);
  }

  protected rightHandSideEvaluation(state:State):any{
    return this.evaluateExpression(this.rightHandSide,state);
  }

  protected ThrowEvaluationException (rightHandSideEvaluation:any,leftHandSideEvaluation:any){
    var errors:[ErrorTypeInfo]=[
      new ErrorTypeInfo("rightHandSide",rightHandSideEvaluation),
      new ErrorTypeInfo("leftHandSide",leftHandSideEvaluation)
    ];
    super.ThrowExceptionOnErrorCheckType(errors);
  }

  toString(): string {
    return `${this.constructor.name}(${this.leftHandSide.toString()}, ${this.rightHandSide.toString()})`;
  }

  unparse(): string {
    return `(${this.leftHandSide.unparse()} ${this.operationSymbol} ${this.rightHandSide.unparse()})`;
  }

  abstract evaluate(state: State): any;
}
