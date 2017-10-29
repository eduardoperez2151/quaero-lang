import { WhileType } from './types/WhileType';

export class CheckState {

  vars: Map<string, WhileType>;
  errors: String [];
  assignedVars: String [];

  constructor() {
    this.errors = [];
    this.assignedVars = []
    this.vars = new Map<string, WhileType>();
  }

  toString(): string {
    return `{ ${Array.from(this.vars.entries()).map(([key, value]) => (`${key} = ${value}`)).join("; ")} }`;
  }

  get(id: string): WhileType {
    return this.vars.get(id);
  }

  set(id: string, type: WhileType) {
    this.vars.set(id, type);
  }

  clone(): CheckState {
    var state = new CheckState();
    this.vars.forEach((value, identifier) => {
      state.set(identifier, value);
    });
    return state;
  }
}
