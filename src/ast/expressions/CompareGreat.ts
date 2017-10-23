import {Exp} from '../ASTNode';
import {AbstractArithmeticBooleanOperation} from './AbstractArithmeticBooleanOperation'

export class CompareGreat extends AbstractArithmeticBooleanOperation {

    constructor(leftHandSide: Exp, rightHandSide: Exp) {
        super(leftHandSide, rightHandSide, ">", (a, b) => a > b);
    }
}