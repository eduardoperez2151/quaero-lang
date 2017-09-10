import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { AbstractComparation } from './AbstractComparation'

export class CompareGreat extends AbstractComparation {

  constructor(leftHandSide: Exp, rightHandSide: Exp) {
    super(leftHandSide, rightHandSide, ">", (a, b) => a > b);
  }
}