import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { AbstractArimeticBooleanOperation } from './AbstractArimeticBooleanOperation'

export class CompareLess extends AbstractArimeticBooleanOperation {

  constructor(leftHandSide: Exp, rightHandSide: Exp) {
    super(leftHandSide, rightHandSide, "<", (a, b) => a < b);
  }
}