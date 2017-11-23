import {TestUtil} from "./utils/TestUtil";
import {State} from "../src/interpreter/State";

describe('Test Quaero:', () => {

    let testUtil= new TestUtil();
    test('Addition with function', () => {
        let state:State = testUtil.executeInterpreter('simpleSum.qr');
        expect(state).not.toBeFalsy();
        expect(state.get('result')).toBe(10);
    });

    test('Substraction with function', () => {
        let state:State = testUtil.executeInterpreter('simpleSub.qr');
        expect(state).not.toBeFalsy();
        expect(state.get('result')).toBe(5);
    });

    test('Multiplication with function', () => {
        let state:State = testUtil.executeInterpreter('mutiplication.qr');
        expect(state).not.toBeFalsy();
        let result=state.get('result');
        expect(result).not.toBeFalsy();
        expect(result).toEqual(25);

    });

    test('Division with function', () => {
        let state:State = testUtil.executeInterpreter('division.qr');
        expect(state).not.toBeFalsy();
        let result=state.get('result');
        expect(result).not.toBeFalsy();
        expect(result).toEqual(2);
    
    });

    test('Cartesian Product with List Comprenhention', () => {
        let state:State = testUtil.executeInterpreter('cartesianProduct.qr');
        expect(state).not.toBeFalsy();
        console.log(state);
    });

});
