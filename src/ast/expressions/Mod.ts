import {Exp} from '../ASTNode';
import {AbstractArithmeticExpression} from './AbstractArithmeticExpression'

export class Mod extends AbstractArithmeticExpression {

    constructor(leftHandSide: Exp, rightHandSide: Exp) {
      super(leftHandSide, rightHandSide, "mod",(a,b)=> a % b);
    }
  }
