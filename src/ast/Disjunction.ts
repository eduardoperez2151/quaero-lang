import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { AbstractBooleanExpression } from './AbstractBooleanExpression'


export class Disjunction extends AbstractBooleanExpression {

  constructor(leftHandSide: Exp, rightHandSide: Exp) {
    super(leftHandSide, rightHandSide, "||",(a,b)=>a || b);
  }
}
