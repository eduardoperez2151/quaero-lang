import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación abstracta de una expresion binarias.
*/
export abstract class AbstractBinaryExpression implements Exp {

  protected leftHandSide: Exp;
  protected rightHandSide: Exp;
  private operationSymbol: string;

  protected constructor(leftHandSide: Exp, rightHandSide: Exp, operationSymbol: string) {
    this.leftHandSide = leftHandSide;
    this.rightHandSide = rightHandSide;
    this.operationSymbol = operationSymbol;
  }

  protected evaluateExpression(expression:Exp,state:State):any{
    return expression.evaluate(state);
  }
  
  protected leftHandSideEvaluation(state:State):any{
    return this.evaluateExpression(this.leftHandSide,state);
  }

  protected rightHandSideEvaluation(state:State):any{
    return this.evaluateExpression(this.rightHandSide,state);
  }
  protected isBoolean(evaluation:any):boolean {
    return typeof evaluation === "boolean";
  }
  
  protected isNumber(evaluation:any):boolean {
    return typeof evaluation === "number";
  }
  
  protected isString(evaluation:any):boolean {
    return typeof evaluation === "string";
  }

  protected ThrowEvaluationException (rightHandSideEvaluation:any,leftHandSideEvaluation:any){
    throw new EvalError(`Error de tipos. rightHandSide type: ${typeof rightHandSideEvaluation }, leftHandSide type: ${typeof leftHandSideEvaluation }`);
  }

  toString(): string {
    return `${this.constructor.name}(${this.leftHandSide.toString()}, ${this.rightHandSide.toString()})`;
  }

  unparse(): string {
    return `(${this.leftHandSide.unparse()} ${this.operationSymbol} ${this.rightHandSide.unparse()})`;
  }

  abstract evaluate(state: State): any;
}