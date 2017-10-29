import {Exp} from '../ASTNode';
import {AbstractArithmeticExpression} from './AbstractArithmeticExpression'

export class Subtraction extends AbstractArithmeticExpression {
    constructor(leftHandSide: Exp, rightHandSide: Exp) {
      super(leftHandSide, rightHandSide, "-",(a,b)=> a - b);
    }
  }
