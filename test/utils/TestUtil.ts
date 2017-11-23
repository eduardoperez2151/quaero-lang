import {Parser} from "nearley";
import * as FileSystem from 'fs';
import {Stmt} from "../../src/ast/ASTNode";
import {MyLexer} from "../../src/lexer/Lexer";
import {tokens} from "../../src/lexer/Tokens";
import {State} from "../../src/interpreter/State";
import {ParserRules, ParserStart} from "../../src/parser/Grammar";

const baseDir = process.env.PWD;
const lexer = new MyLexer(tokens);
const parser = new Parser(ParserRules, ParserStart, {lexer});

export class TestUtil {

    static readFile = (fileName, type) => new Promise((resolve, reject) =>
        FileSystem.readFile(fileName, type, (err, data) => err ? reject(err) : resolve(data)));


    ////Hay que arreglar unas cosas de un warning pero usen esta firma yo lo veo despues abrazo!!!!
    static executeInterpreter: State = (fileName) => {
        return TestUtil.readFile(baseDir + "/test/resources/" + fileName, 'UTF8')
            .then((file) => {
                let state = new State();
                parser.feed(file);
                let nodes: Stmt[] = parser.results;
                switch (nodes.length) {
                    case 0: {
                        throw new Error("Error al parsear el Archivo" + fileName);
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
            })
            .catch((error) => {
                throw new Error("Error al leer el archivo " + fileName, error)
            });
    };

}