import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { AbstractBooleanComparation } from './AbstractBooleanComparation'


export class Disjunction extends AbstractBooleanComparation {

  constructor(leftHandSide: Exp, rightHandSide: Exp) {
    super(leftHandSide, rightHandSide, "||",(a,b)=>a || b);
  }
}
