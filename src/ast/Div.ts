import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { AbstractArithmeticExpression } from './expressions/AbstractArithmeticExpression'

export class Div extends AbstractArithmeticExpression {

    constructor(leftHandSide: Exp, rightHandSide: Exp) {
      super(leftHandSide, rightHandSide, "div",(a,b)=> parseInt((a / b) as any));
    }
  }
