import * as readlineSync from "readline-sync";

import {Parser} from "nearley";

import {tokens} from "./lexer/Tokens";
import {MyLexer} from "./lexer/Lexer"
import {ParserRules, ParserStart} from "./parser/Grammar";

import {Stmt} from './ast/AST';

import {State} from './interpreter/State';


console.log("Quero :: REPL");

var state = new State();
state = setPredFunctions(state);
while (true) {
    const lexer = new MyLexer(tokens);
    const parser = new Parser(ParserRules, ParserStart, {lexer});

    const input = readlineSync.question('> ');

    try {
        // Parse user input
        parser.feed(input);
        // Print result
        const nodes: Stmt[] = parser.results;

        switch (nodes.length) {
            case 0: {
                console.log("Parse failed!!");
                break;
            }
            case 1: {
                const node = nodes[0];
                state = node.evaluate(state);
                console.log(`\n${state.toString()}`);
                break;
            }
            default: {
                console.log("Warning!! Grammar is ambiguous, multiple parse results.\n");
                nodes.map((node) => console.log(node.toString()));
                break;
            }
        }

    } catch (parseError) {
        console.log(parseError);
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
    return state
}
