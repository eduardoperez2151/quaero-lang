import {KeyValue} from '../../AST';
import {State} from '../../../interpreter/State';
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
        return itemArrayMapped.some(item => itemsSet.size === itemsSet.add(item).size);
    }

    toString(): string {
        return `${this.constructor.name}(${this.arr.toString()})`;
    }

    protected collectionUnParsing() {
        return this.arr.map(item => item.unParse()).join(',');
    }

    protected createList(state: State): any[] {
        let result = [];
        let aux;
        let map = new Map();
        for (let i =0;i<this.arr.length;i++){
          let aux = this.arr[i].evaluate(state);
          if (aux instanceof Map){
            let key = aux.get("key");
            let value = aux.get("value");
            result[key] = value;
            result[i] = value;
            map.set(key,value);
          }else{
            result[i] = aux;
          }
        }
        result["keyValues"] = map;
        return result;//this.arr.map(item => item.evaluate(state));
    }
    protected createSet(state: State) {
        let result = new Set();
        let aux;
        let map = new Map()
        for (let i =0;i<[...this.arr].length;i++){
          let aux = this.arr[i].evaluate(state);
          if (aux instanceof Map){
            let key = aux.get("key");
            let value = aux.get("value");
            result[key] = value;
            map.set(key, value);
            aux = value;
          }
          let existInResult = [...result].findIndex(item => AbstractExpression.deepEquals(item,aux));
          if(existInResult == -1) result.add(aux);
        }
        result["keyValues"] = map;
        return result;//this.arr.map(item => item.evaluate(state));
    }

//    public processItems(): Array<any> {
//        return this.arr.map(item => (item instanceof KeyValue) ? item.exp : item);
//    }

    public has(item: any): boolean {
        return item instanceof KeyValue
            ? this.arr.find(elem => {return elem.id === item.id && elem.exp === item.exp})
            : new Set(this.arr).has(item);

    }

}
