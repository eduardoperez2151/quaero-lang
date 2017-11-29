import {Parser} from "nearley";
import * as FileSystem from 'fs';
import {Stmt} from "../../src/ast/ASTNode";
import {MyLexer} from "../../src/lexer/Lexer";
import {tokens} from "../../src/lexer/Tokens";
import {State} from "../../src/interpreter/State";
import {ParserRules, ParserStart} from "../../src/parser/Grammar";
const baseDir = process.env.PWD ? process.env.PWD : process.cwd();

export class TestUtil {

    readFile = (fileName, type) => FileSystem.readFileSync(fileName, type);
    executeInterpreterForLazyPipol (code:string){
        let state = new State();
        state = setPredFunctions(state);
        let lexer = new MyLexer(tokens);
        let parser = new Parser(ParserRules, ParserStart, {lexer});
        parser.feed(code);
        let nodes: Stmt[] = parser.results;
        switch (nodes.length) {
            case 0: {
                throw new Error("Error al parsear " + code);
            }
            case 1: {
                const node = nodes[0];
                return node.evaluate(state);
            }
            default: {
                throw new Error("Gramatica Ambigua");
            }
        }
    }
    executeInterpreter: State = (fileName) => {
        let file:string = this.readFile(baseDir + "/test/resources/" + fileName, 'utf8');
        let state = new State();
        state = setPredFunctions(state);
        let lexer = new MyLexer(tokens);
        let parser = new Parser(ParserRules, ParserStart, {lexer});
        parser.feed(file);
        let nodes: Stmt[] = parser.results;
        switch (nodes.length) {
            case 0: {
                throw new Error("Error al parsear el Archivo " + fileName);
            }
            case 1: {
                const node = nodes[0];
                return node.evaluate(state);
                break;
            }
            default: {
                throw new Error("Gramatica Ambigua");
            }
        }
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

function setPredFunctions(state: State): State {
    state.set("print", print);
    state.set("div", div);
    state.set("mod", mod);
    state.set("string", convertString);
    state.set("int", convertInt);
    state.set("number", convertNumber);
    state.set("boolean", convertBoolean);
    state.set("toArray", toArray);
    return state
}
