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
