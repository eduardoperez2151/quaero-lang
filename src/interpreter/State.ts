import { Function } from '../ast/AST';
export class State {

  vars: Map<string, any>;

  constructor() {
    this.vars = setPredFunctions(new Map<string, any>());
  }

  toString(): string {
    return `{ ${(Array.from(this.vars.entries())).filter(([key, value]) =>(! (value instanceof Function) && !(typeof value === 'function'))).map(([key, value]) => (`${key} = ${value}`)).join("; ")} }`;
    //return `{ ${(Array.from(this.vars.entries())).map(([key, value]) => (`${key} = ${value}`)).join("; ")} }`;
  }

  get(id: string): any {
    return this.vars.get(id);
  }

  set(id: string, value: any) {
    this.vars.set(id, value);
  }

  clone(): State {
    var state = new State();
    this.vars.forEach((value, identifier) => {
      state.set(identifier, value);
    });
    return state;
  }

}
function print(valor: any) {
    console.log(valor);
}

function div(a, b): number {
    if (typeof a === 'number' && typeof b === 'number') {
        return Math.floor(a / b);
    } else {
        return null
    }
}

function mod(a, b): number {
    if (typeof a === 'number' && typeof b === 'number') {
        return a % b;
    } else {
        return null;
    }
}
function toArray(set) {
    return [...set];
}

function convertString(valor: any): string {
    return String(valor);
}

function convertInt(valor: any): number {
    if (typeof valor === "number" || typeof valor === 'string') {
        return Math.floor(Number(valor));
    } else {
        return null;
    }
}

function convertNumber(valor: any): number {
    if (typeof valor === "number" || typeof valor === 'string') {
        return Number(valor);
    } else {
        return null;
    }
}

function convertBoolean(valor: any): boolean {
    if((valor instanceof Array || valor instanceof Set) && [...valor].length ===0)return false;
    switch (valor) {
        case null:
        case "":
        case 0:
            return false;
        default:
            return true;
    }
}
function slice(array, ini, end){
  let result = array.slice(ini,end);
  result["keyValues"] = new Map();
  return result;
}
function setPredFunctions(map) {
    map.set("print", print);
    map.set("div", div);
    map.set("mod", mod);
    map.set("string", convertString);
    map.set("int", convertInt);
    map.set("number", convertNumber);
    map.set("boolean", convertBoolean);
    map.set("toArray", toArray);
    map.set("slice", slice);
    return map;
}
