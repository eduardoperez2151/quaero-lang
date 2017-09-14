import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { AbstractArimeticExpression } from './AbstractArimeticExpression'

export class Div extends AbstractArimeticExpression {

    constructor(leftHandSide: Exp, rightHandSide: Exp) {
      super(leftHandSide, rightHandSide, "div",(a,b)=> parseInt((a / b) as any));
    }
  }
