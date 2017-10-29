import {Exp} from '../ASTNode';
import {AbstractArithmeticExpression} from './AbstractArithmeticExpression'

export class Div extends AbstractArithmeticExpression {

    constructor(leftHandSide: Exp, rightHandSide: Exp) {
      super(leftHandSide, rightHandSide, "div",(a,b)=> parseInt((a / b) as any));
    }
  }
