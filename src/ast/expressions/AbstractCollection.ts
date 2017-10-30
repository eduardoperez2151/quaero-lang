import {KeyValue} from '../AST';
import {State} from '../../interpreter/State';
import {AbstractExpression} from "./AbstractExpression";

export abstract class AbstractCollection extends AbstractExpression {

    protected arr: Array<any>;

    constructor(arr?: Array<any>) {
        super();
        if (arr) {
            if (this.hasDuplicates(arr)) {
                throw new Error("Hay elementos con claves repetidas");
            }
            this.arr = arr;
        } else {
            this.arr = [];
        }
    }

    private hasDuplicates(itemArray) {
        let itemsSet = new Set();
        let itemArrayMapped = itemArray.map(item => {
            if (this.isKeyValue(item)) {
                return item.id;
            }
        }).filter(item => item);
        console.log(itemArrayMapped);
        return itemArrayMapped.some(item => itemsSet.size === itemsSet.add(item).size);
    }

    toString(): string {
        return `${this.constructor.name}(${this.arr.toString()})`;
    }

    protected collectionUnParsing() {
        return this.arr.map(item => item.unParse()).join(',');
    }

    protected collectionEvaluate(state: State): any[] {
        return this.arr.map(item => item.evaluate(state));
    }

    public processItems(): Array<any> {
        return this.arr.map(item => (item instanceof KeyValue) ? item.exp : item);
    }

    public has(item: any, state: State): boolean {
        // True si this.arr contine al item, false si no contine al item.
        if (item instanceof KeyValue) {
            for (var i = 0; i < this.arr.length; i++) {
                if (this.arr[i] instanceof KeyValue) {
                    var kv = this.arr[i];
                    if (kv.exp === item.exp && kv.id === item.id) return true;
                }
            }
            return false;
        } else {
            var arrSet = new Set(this.arr);
            return arrSet.has(item);
        }
    }

}