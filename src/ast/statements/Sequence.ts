import { Stmt } from '../ASTNode';
import { State } from '../../interpreter/State';

export class Sequence implements Stmt {

  statements: [Stmt];

  constructor(statements: [Stmt]) {
    this.statements = statements;
  }

  toString(): string {
    const statements = this.statements
      .filter((stmt) => (stmt !== undefined))
      .map((stmt) => (stmt.toString()))
      .join(", ");
    return `Sequence(${statements})`
  }

  unParse(): string {
    const statements = this.statements
      .filter((stmt) => (stmt !== undefined))
      .map((stmt) => (stmt.toString()))
      .join(" ");
    return `{ ${statements} }`
  }

  evaluate(state: State): State {
    //state=this.statements.reduce((state:State,stmt:Stmt) => stmt.evaluate(state),state);
    for (var i = 0;i<this.statements.length;i++){
      this.statements[i].evaluate(state);
      if(state.get("return")) break;
    }
    return state;
  }

}
