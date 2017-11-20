import {Numeral} from "../src/ast/expressions/Numeral";
import {Addition} from "../src/ast/expressions/Addition";
import {State} from "../src/interpreter/State";
import {Literal} from "../src/ast/expressions/Literal";

let state = new State();

beforeEach = (() => state.vars.clear());


describe('Addition Test :', () => {
    let addition = (a, b) => new Addition(a, b);

    test('2+2 = 4', () => {
        let numeral = new Numeral(2);
        let evaluationResult = addition(numeral, numeral).evaluate(state);
        expect(evaluationResult).not.toBeNull();
        expect(evaluationResult).toBe(4);
    });

});
