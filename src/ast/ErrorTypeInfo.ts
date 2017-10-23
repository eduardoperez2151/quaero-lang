
export class ErrorTypeInfo {

    expressionName:string
    expressionEvaluation:any

    constructor(expressionName:string,expressionEvaluation:any){
        this.expressionName=expressionName;
        this.expressionEvaluation=expressionEvaluation;
    }

    toString(){
        return `Expresion:[${this.expressionName}] del tipo:[${typeof this.expressionEvaluation}]`;
    }
}