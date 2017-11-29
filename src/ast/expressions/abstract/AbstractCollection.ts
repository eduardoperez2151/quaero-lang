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
          let existInResult = [...result].findIndex(item => theCakeIsALie(item,aux));
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
function theCakeIsALie(a,b){
  if((a instanceof Set && b instanceof Set) || (a instanceof Array && b instanceof Array)){
    let newA=[...a];
    newA["KeyValues"] = a["keyValues"];
    let newB=[...b];
    newB["keyValues"] = b["keyValues"];
    if(newA.length != newB.length) return false;
    else if(newA.length ==0) return true;
    let l33t;
    l33t=true;
    for(let i=0;i<newA.length;i++){
      l33t = l33t && theCakeIsALie(newA[i],newB[i]);
    }
    let sameKeys;
    if(typeof a["keyValues"]=='undefined'){
      if(typeof b["keyValues"]=='undefined') sameKeys = true;
      else sameKeys = false;
    }else sameKeys = theCakeIsALie([...a["keyValues"].keys()],[...b["keyValues"].keys()]);
    return l33t && sameKeys;
  }
  if((b instanceof Set || b instanceof Array) && (a instanceof Array || a instanceof Set)){return false;}
  return a==b;
}
