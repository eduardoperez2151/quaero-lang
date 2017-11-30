import { Exp } from '../ASTNode';
import { State } from '../../interpreter/State';
import {ErrorTypeInfo} from "../ErrorTypeInfo";

export class Opposite implements Exp {

  value: Exp;

  constructor(value: Exp) {
    this.value = value;
  }

  toString(): string {
    return `Oposite(${this.value})`;
  }

  unParse(): string {
    return `- ${this.value}`;
  }

  evaluate(state: State): number {
    let evaluation=this.value.evaluate(state);
    if(typeof  evaluation === 'number'){
        return (-1)*evaluation;
    }
      let errors: [ErrorTypeInfo] = [new ErrorTypeInfo("value", evaluation)];
      throw new EvalError(`\n######## ERROR DE TIPOS ########\n${errors.join("\n") }\n################################`);



  }
}
