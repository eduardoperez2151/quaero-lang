import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { AbstractArimeticExpression } from './AbstractArimeticExpression'

export class Mod extends AbstractArimeticExpression {

    constructor(leftHandSide: Exp, rightHandSide: Exp) {
      super(leftHandSide, rightHandSide, "mod",(a,b)=> a % b);
    }
  }
