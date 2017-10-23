import {Exp} from '../ASTNode';
import {AbstractArithmeticExpression} from './AbstractArithmeticExpression'

export class Multiplication extends AbstractArithmeticExpression {

  constructor(leftHandSide: Exp, rightHandSide: Exp) {
    super(leftHandSide, rightHandSide, "*",(a,b)=> a*b );
  }
}