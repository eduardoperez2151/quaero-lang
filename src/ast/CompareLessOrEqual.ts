import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { AbstractArimeticBooleanOperation } from './AbstractArimeticBooleanOperation'

export class CompareLessOrEqual extends AbstractArimeticBooleanOperation {

  constructor(leftHandSide: Exp, rightHandSide: Exp) {
    super(leftHandSide, rightHandSide, "<=", (a, b) => a <= b);
  }
}