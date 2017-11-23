import {TestUtil} from "./utils/TestUtil";

describe('QuickSort Test:', () => {
    //le pasamos el archio al interpreter
    let state = TestUtil.executeInterpreter('quicksort.qr');

    //depues hacermos las pruebas sobre el estado resultante
    test('2+2 = 4', () => {
        expect(state).not.toBeNull();
    });

    //:D 
});
