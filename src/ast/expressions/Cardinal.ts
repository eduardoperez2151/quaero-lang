import {Exp} from '../ASTNode';
import {State} from '../../interpreter/State';
import {ErrorTypeInfo} from "../ErrorTypeInfo";
import {AbstractExpression} from "./AbstractExpression";

export class Cardinal extends AbstractExpression {

    collection: Exp;

    constructor(collection: Exp) {
        super();
        this.collection = collection;
    }

    toString(): string {
        return `Cardinal(${this.collection.toString()}`;
    }

    unParse(): string {
        return `Cardinal (${this.collection.unParse()})`;
    }

    evaluate(state: State): any {
        let list = this.collection.evaluate(state);
        if (this.isList(list)) {
            return list.length;
        } else if (this.isSet(list)) {
            return list.size;
        }else if (this.isString(list)) {
            return list.split("").length
        }
        let error = new ErrorTypeInfo("list", list);
        this.throwExceptionOnErrorCheckType([error]);
    }
}
