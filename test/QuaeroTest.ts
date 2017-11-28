import {TestUtil} from "./utils/TestUtil";
import {State} from "../src/interpreter/State";

describe('Test Quaero:', () => {

    let testUtil= new TestUtil();

    test('Opposite with function', () => {
        let state:State = testUtil.executeInterpreter('oposite.qr');
        expect(state).not.toBeFalsy();
        expect(state.get('result')).toBe(-3);
    });

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
        let state:State = testUtil.executeInterpreter('simpleMul.qr');
        expect(state).not.toBeFalsy();
        let result=state.get('result');
        expect(result).not.toBeFalsy();
        expect(result).toEqual(25);
    });

    test('Division with function', () => {
        let state:State = testUtil.executeInterpreter('simpleDiv.qr');
        expect(state).not.toBeFalsy();
        let result=state.get('result');
        expect(result).not.toBeFalsy();
        expect(result).toEqual(2);
    });

    test('Factorial', () => {
        let state:State = testUtil.executeInterpreter('factorial.qr');
        expect(state).not.toBeFalsy();
        let result1=state.get('result1');
        let result2=state.get('result2');
        let result3=state.get('result3');
        let result4=state.get('result4');
        expect(result1).not.toBeFalsy();
        expect(result2).not.toBeFalsy();
        expect(result3).not.toBeFalsy();
        expect(result3).not.toBeFalsy();
        expect(result1).toBe(1);
        expect(result1).toEqual(result2);
        expect(result3).toBe(120);
        expect(result4).toBe(720);
    });

    test('Cartesian Product with List Comprenhention', () => {
        let state:State = testUtil.executeInterpreter('cartesianProduct.qr');
        expect(state).not.toBeFalsy();
        console.log(state);
    });

    test('Compare_equals with function', () => {
        let state:State = testUtil.executeInterpreter('igual.qr');
        expect(state).not.toBeFalsy();
        let result=state.get('result');
        expect(result).not.toBeFalsy();
    });

    test('Compare_notEquals with function', () => {
        let state:State = testUtil.executeInterpreter('distinto.qr');
        expect(state).not.toBeFalsy();
        let result=state.get('result');
        expect(result).toBeFalsy();
    });
    
    test('Compare_minor with function', () => {
        let state:State = testUtil.executeInterpreter('menor.qr');
        expect(state).not.toBeFalsy();
        let result=state.get('result');
        expect(result).not.toBeFalsy();
    });

});
