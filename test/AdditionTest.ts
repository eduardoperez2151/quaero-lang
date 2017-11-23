import {TestUtil} from "./utils/TestUtil";

describe('QuickSort Test:', () => {
    let state = TestUtil.executeInterpreter('quicksort.qr');

    test('2+2 = 4', () => {
        expect(state).not.toBeNull();
    });

});
