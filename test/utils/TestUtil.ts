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

    executeInterpreter: State = (fileName) => {
        let file:string = this.readFile(baseDir + "/test/resources/" + fileName, 'utf8');
        return this.executeInterpreterForLazyPipol(file);
    };

    executeInterpreterForLazyPipol:State=(input:string)=>{
        let state = new State();
        let lexer = new MyLexer(tokens);
        let parser = new Parser(ParserRules, ParserStart, {lexer});
        parser.feed(input);
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
    };


}
