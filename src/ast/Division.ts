import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { AbstractArithmeticExpression } from './expressions/AbstractArithmeticExpression'

export class Division extends AbstractArithmeticExpression {
  
    constructor(leftHandSide: Exp, rightHandSide: Exp) {
      super(leftHandSide, rightHandSide, "/",(a,b)=> a / b);
    }
  }