import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { AbstractArithmeticExpression } from './expressions/AbstractArithmeticExpression'

export class Mod extends AbstractArithmeticExpression {

    constructor(leftHandSide: Exp, rightHandSide: Exp) {
      super(leftHandSide, rightHandSide, "mod",(a,b)=> a % b);
    }
  }
