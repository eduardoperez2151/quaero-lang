import { Function } from '../ast/AST';
export class State {

  vars: Map<string, any>;

  constructor() {
    this.vars = new Map<string, any>();
  }

  toString(): string {
    //return `{ ${(Array.from(this.vars.entries())).filter(([key, value]) =>(! (value instanceof Function) && !(typeof value === 'function'))).map(([key, value]) => (`${key} = ${value}`)).join("; ")} }`;
    return `{ ${(Array.from(this.vars.entries())).map(([key, value]) => (`${key} = ${value}`)).join("; ")} }`;
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
