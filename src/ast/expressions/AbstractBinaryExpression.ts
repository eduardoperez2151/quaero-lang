import {Exp} from '../ASTNode';
import {State} from '../../interpreter/State';
import {ErrorTypeInfo} from "../ErrorTypeInfo";
import {AbstractExpression} from "./AbstractExpression";

export abstract class AbstractBinaryExpression extends AbstractExpression {

    protected leftHandSide: Exp;
    protected rightHandSide: Exp;
    protected operationSymbol: string;

    protected constructor(leftHandSide: Exp, rightHandSide: Exp, operationSymbol: string) {
        super();
        this.leftHandSide = leftHandSide;
        this.rightHandSide = rightHandSide;
        this.operationSymbol = operationSymbol;
    }

    protected leftHandSideEvaluation(state: State): any {
        return this.evaluateExpression(this.leftHandSide, state);
    }

    protected rightHandSideEvaluation(state: State): any {
        return this.evaluateExpression(this.rightHandSide, state);
    }

    protected ThrowEvaluationException(rightHandSideEvaluation: any, leftHandSideEvaluation: any) {
        let errors: [ErrorTypeInfo] = [new ErrorTypeInfo("rightHandSide", rightHandSideEvaluation), new ErrorTypeInfo("leftHandSide", leftHandSideEvaluation)];
        super.throwExceptionOnErrorCheckType(errors);
    }
    protected setKeys(array,map){
      //let delKeys = new Map(); Que se deberia hacer si se quita una key del array pero luego aparece otra vez
      let keys = [...map.keys()]
      for (let i = 0;i<keys.length;i++){
        if(array[keys[i]]){
          throw new Error("Claves duplicadas")
        }
        if(array.includes(map.get(keys[i]))){
          array[keys[i]] = map.get(keys[i]);
          array["keyValues"].set(keys[i],map.get(keys[i]));
        }
      }
      return array;
    }
    toString(): string {
        return `${this.constructor.name}(${this.leftHandSide.toString()}, ${this.rightHandSide.toString()})`;
    }

    unParse(): string {
        return `(${this.leftHandSide.unParse()} ${this.operationSymbol} ${this.rightHandSide.unParse()})`;
    }

}
