import {TestUtil} from "./utils/TestUtil";
import {State} from "../src/interpreter/State";
var _ = require('underscore');
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
        expect(true).toBe(_.isEqual([[0,2],[0,3],[1,2],[1,3]],state.get('cartesian')));
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

    test('Compare_menor with function', () => {
        let state:State = testUtil.executeInterpreter('menor.qr');
        expect(state).not.toBeFalsy();
        let result=state.get('result');
        expect(result).not.toBeFalsy();
    });

    test('Compare_mayor with function', () => {
        let state:State = testUtil.executeInterpreter('mayor.qr');
        expect(state).not.toBeFalsy();
        let result=state.get('result');
        expect(result).not.toBeFalsy();
    });

    test('Compare_menorequals with function', () => {
        let state:State = testUtil.executeInterpreter('menorequals.qr');
        expect(state).not.toBeFalsy();
        let result=state.get('result');
        expect(result).toBeFalsy();
    });

    test('Compare_mayorequals with function', () => {
        let state:State = testUtil.executeInterpreter('mayorequals.qr');
        expect(state).not.toBeFalsy();
        let result=state.get('result');
        expect(result).toBeFalsy();
    });

    test('Mod_div_entera', () => {
        let state:State = testUtil.executeInterpreter('mod.qr');
        expect(state).not.toBeFalsy();
        let result1=state.get('result1');
        let result2=state.get('result2');
        expect(result1).toBe(0);
        expect(result2).toBe(1);
    });

    test('Potencia', () => {
        let state:State = testUtil.executeInterpreter('potencia.qr');
        expect(state).not.toBeFalsy();
        let result1=state.get('result1');
        let result2=state.get('result2');
        let result3=state.get('result3');
        let result4=state.get('result4');
        expect(result1).toBe(1);
        expect(result2).toBe(4096)
        expect(result3).toBe(0);
        expect(result4).toBe(8);
    });
    test('LazyPeopleIsBestPeople', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol("@main:{theAnswer = (2+2-1*100/4)+21+42;}@");
        let result1=state.get('theAnswer');
        expect(result1).toBe(42);
    });
    test('SumOf1HexadecimalsAnd2Exponential', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol("@main:{a = 0xC4f3 ;b=0.5E-11;c=1e-4;result = a+b+c;}@");
        let result1=state.get('result');
        expect(result1).toBe(50419.000100000005);
    });
    test('Divide3Numbers', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol("@main:{a=2;b=3;c=3;result = a/b/c;}@");
        let result1=state.get('result');
        expect(result1).toBe(2/3/3);
    });
    test('AssignInfinity', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol("@main:{result = Infinity;}@");
        let result1=state.get('result');
        expect(result1).toBe(Number.POSITIVE_INFINITY);
    });
    test('NegativeInfinity', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol("@main:{result = -Infinity;}@");
        let result1=state.get('result');
        expect(result1).toBe(-1*Number.POSITIVE_INFINITY);
    });
    test('AssignNaN', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol("@main:{result = NaN;}@");
        let result1=state.get('result');
        expect(true).toBe(isNaN(result1));
    });
    test('NoOcta010=10', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol("@main:{result = 010;}@");
        let result1=state.get('result');
        expect(result1).toBe(10);
    });
    test('Assign""', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result="";}@');
        let result1=state.get('result');
        expect(result1).toBe("");
    });
    test('Assign"¡hola mundo!"', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = "¡hola mundo!";}@');
        let result1=state.get('result');
        expect(result1).toBe("¡hola mundo!");
    });

    test('AssignNull', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol("@main:{result = null;}@");
        let result1=state.get('result');
        expect(result1).toBe(null);
    });
    test('Assign2ToX1_y2and1_1_AndSumThem', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol("@main:{X1_y2 = 2;_1_=1;result =X1_y2+_1_;}@");
        let result1=state.get('result');
        expect(3).toBe(result1);
    });
    test('create[1,2,{3},4,[5]]', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol("@main:{result = [1,2,[3],4,[5]];}@");
        let result1=state.get('result');
        expect(_.isEqual(result1,[1,2,[3],4,[5]])).toBe(true);
    });
    test('create[1, "!":2, _:3]', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1, "!":2, _:3];}@');
        let result1=state.get('result');
        expect(_.isEqual(result1,[1,2,3])).toBe(true);
    });
    test('create[a:2,"b":3,4,l:[5,4]]', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[a:2,"b":3,4,l:[5,4]];}@');
        let result1=state.get('result');
        expect(_.isEqual(result1,[2,3,4,[5,4]])).toBe(true);
    });
    test('IndexOf0,1,2,3From[a:2,"b":3,4,l:[5,4]]', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[a:2,"b":3,4,l:[5,4]];result2=result[0];result3=result[1];result4=result[2];result5=result[3];}@');
        let result2=state.get('result2');
        let result3=state.get('result3');
        let result4=state.get('result4');
        let result5=state.get('result5');
        expect(result2).toBe(2);
        expect(result3).toBe(3);
        expect(result4).toBe(4);
        expect(_.isEqual(result5,[5,4])).toBe(true);
    });
    test('IndexOfa,b,lFrom[a:2,"b":3,4,l:[5,4]]', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{arr = [a:2,"b":3,4,l:[5,4]];result2=arr["a"];result3=arr["b"];result4=arr["l"];}@');
        let result2=state.get('result2');
        let result3=state.get('result3');
        let result4=state.get('result4');
        expect(result2).toBe(2);
        expect(result3).toBe(3);
        expect(_.isEqual(result4,[5,4])).toBe(true);
    });
    test('DotOfa,b,lFrom[a:2,"b":3,4,l:[5,4]]', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{arr = [a:2,"b":3,4,l:[5,4]];result2=arr.a;result3=arr.b;result4=arr.l;}@');
        let result2=state.get('result2');
        let result3=state.get('result3');
        let result4=state.get('result4');
        expect(result2).toBe(2);
        expect(result3).toBe(3);
        expect(_.isEqual(result4,[5,4])).toBe(true);
    });
    test('IndexOf(1+1),(u|u=3-3),(a|a="l")From[a:2,"b":3,"WoW",l:[5,4]]', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{a = "l";u=3-3;arr = [a:2,"b":3,"WoW",l:[5,4]];result2=arr[1+1];result3=arr[u];result4=arr[a];}@');
        let result2=state.get('result2');
        let result3=state.get('result3');
        let result4=state.get('result4');
        expect(result2).toBe("WoW");
        expect(result3).toBe(2);
        expect(_.isEqual(result4,[5,4])).toBe(true);
    });
    test("EmptyList", () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = [];}@');
        expect(_.isEqual(state.get("result"),[])).toBe(true);
    });
    test('-xWhenX=3', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol("@main:{x=3;result=-x;}@");
        let result1=state.get('result');
        expect(result1).toBe(-3);
    });
    test(' suma (1 + 2.3)', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol("@main:{result = (1 + 2.3);}@");
        let result1=state.get('result');
        expect(result1).toBe(3.3);
    });
    test('resta (2 - 1)', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol("@main:{result = (2 - 1);}@");
        let result1=state.get('result');
        expect(result1).toBe(1);
    });
    test('producto (x * 2) when x=30', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol("@main:{x=30;result=x*2;}@");
        let result1=state.get('result');
        expect(result1).toBe(60);
    });
    test('Division (1 / p) when p = 4', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol("@main:{p=4;result=1/p;}@");
        let result1=state.get('result');
        expect(result1).toBe(1/4);
    });
    test('Var == Var Expect True', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = "Var"=="Var";}@');
        let result1=state.get('result');
        expect(result1).toBe(true);
    });
    test('Var != Var Expect False', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = "Var"/="Var";}@');
        let result1=state.get('result');
        expect(result1).toBe(false);
    });
    test('Var > Var Expect False', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = "Var">"Var";}@');
        let result1=state.get('result');
        expect(result1).toBe(false);
    });
    test('Var < Var Expect False', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = "Var"<"Var";}@');
        let result1=state.get('result');
        expect(result1).toBe(false);
    });
    test('Var >= Var Expect True', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = "Var">="Var";}@');
        let result1=state.get('result');
        expect(result1).toBe(true);
    });
    test('Var <= Var Expect True', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = "Var"<="Var";}@');
        let result1=state.get('result');
        expect(result1).toBe(true);
    });
    test('[1,2,3,"pepe",[5]] == [1,2,3,"pepe",[5]] Expect True', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = [1,2,3,"pepe",[5]] == [1,2,3,"pepe",[5]];}@');
        let result1=state.get('result');
        expect(result1).toBe(true);
    });
    test('[1,2,3,"pepe",[5]] /= [1,2,3,"pepe",[5]] Expect False', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = [1,2,3,"pepe",[5]] /= [1,2,3,"pepe",[5]];}@');
        let result1=state.get('result');
        expect(result1).toBe(false);
    });
    test('[1,2,3,"pepe",[5]] > [1,2,3,"pepe",[5]] Expect False' , () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = [1,2,3,"pepe",[5]] > [1,2,3,"pepe",[5]];}@');
        let result1=state.get('result');
        expect(result1).toBe(false);
    });
    test('[1,2,3,"pepe",[5]] < [1,2,3,"pepe",[5]] Expect False', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = [1,2,3,"pepe",[5]] < [1,2,3,"pepe",[5]];}@');
        let result1=state.get('result');
        expect(result1).toBe(false);
    });
    test('[1,2,3,"pepe",[5]] >= [1,2,3,"pepe",[5]] Expect True', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = [1,2,3,"pepe",[5]] >= [1,2,3,"pepe",[5]];}@');
        let result1=state.get('result');
        expect(result1).toBe(true);
    });
    test('[1,2,3,"pepe",[5]] <= [1,2,3,"pepe",[5]] Expect True', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = [1,2,3,"pepe",[5]] <= [1,2,3,"pepe",[5]];}@');
        let result1=state.get('result');
        expect(result1).toBe(true);
    });
    test('[1,2,-3] < [1,2,3] Expect True', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = [1,2,-3] < [1,2,3];}@');
        let result1=state.get('result');
        expect(result1).toBe(true);
    });
    test('-3 < 5 Expect True', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = -3 < 5 ;}@');
        let result1=state.get('result');
        expect(result1).toBe(true);
    });
    test('10 > 5 Expect True', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = 10>5;}@');
        let result1=state.get('result');
        expect(result1).toBe(true);
    });
    test('[50,20] > [50] Expect True', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = [50,20] > [50];}@');
        let result1=state.get('result');
        expect(result1).toBe(true);
    });
/*
    test('[50,-3]<[50] Expect False', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = [50,20] < [50];}@');
        let result1=state.get('result');
        expect(result1).toBe(false);
    });*/
    test('true < false Expect False', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = true<false;}@');
        let result1=state.get('result');
        expect(result1).toBe(false);
    });
    test('true > false Expect True', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = true>false;}@');
        let result1=state.get('result');
        expect(result1).toBe(true);
    });
    test('NaN > 10 Expect false', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = NaN>10;}@');
        let result1=state.get('result');
        expect(result1).toBe(false);
    });
    test('NaN /= "pepe" Expect false', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = NaN/="pepe";}@');
        let result1=state.get('result');
        expect(result1).toBe(false);
    });

    test('QuickSort', () => {
        let state:State = testUtil.executeInterpreter('quicksort.qr');
        let unSortedList=state.get('unSortedList');
        let sortedList= state.get('sortedList');
        expect(unSortedList).not.toBeNull();
        expect(sortedList).not.toBeNull();
        expect(unSortedList.length).toEqual(sortedList.length);
        expect(unSortedList.sort((a,b)=>a-b)).toEqual(sortedList);
    });

    test('List Comparison', () => {
        let state:State = testUtil.executeInterpreter('ListComparison.qr');
        expect(state).not.toBeFalsy();
        let result_1 = state.get('result_1');
        let result_2 = state.get('result_2');
        let result_3 = state.get('result_3');
        let result_4 = state.get('result_4');
        let result_5 = state.get('result_5');
        let result_6 = state.get('result_6');
        let result_7 = state.get('result_7');
        let result_8 = state.get('result_8');
        let result_9 = state.get('result_9');
        let result_10 = state.get('result_10');
        let result_11 = state.get('result_11');
        expect(result_1).toBe(true);
        expect(result_2).toBe(true);
        expect(result_3).toBe(true);
        expect(result_4).toBe(false);
        expect(result_5).toBe(true);
        expect(result_6).toBe(true);
        expect(result_7).toBe(true);
        expect(result_8).toBe(false);
        expect(result_9).toBe(true);
        expect(result_10).toBe(true);
        expect(result_11).toBe(true);

    });
    test('[1,2,3] == [1,2,3]', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol("@main:{result=[1,2,3]==[1,2,3];}@");
        let result1=state.get('result');
        expect(result1).toBe(true);
    });
    test('["1",2,3] ===["1",2,3]', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=["1",2,3]==["1",2,3];}@');
        let result1=state.get('result');
        expect(result1).toBe(true);
    });
    test('[1,2,3]==[3,2,1] expect false', () => {
        let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,3]==[3,2,1];}@');
        let result1=state.get('result');
        expect(result1).toBe(false);
    });
  test('[[1,[2],3]==[[1,[2]],3] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[[1,[2]],3]==[[1,[2]],3];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('[[1,{2}]],3]==[[1,[2]],3] expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[[1,{2}],3]==[[1,[2]],3];}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('[1,2,3]==[a:1,2,3] expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,3]==[a:1,2,3];}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('[a:1,b:2,3]==[a:1,b:2,3] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[a:1,b:2,3]==[a:1,b:2,3];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });

  test('[1,2,3]/=[1,2,3] expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,3]/=[1,2,3];}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('["1",2,3]/=["1",2,3] expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=["1",2,3]/=["1",2,3];}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('[1,2,3]/=[3,2,1] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,3]/=[3,2,1];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('[[1,[2]],3]/=[[1,[2]],3] expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[[1,[2]],3]/=[[1,[2]],3];}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('[[1,{2}],3]/=[[1,[2]],3] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[[1,{2}],3]/=[[1,[2]],3];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('[1,2,3]/=[a:1,2,3] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,3]/=[a:1,2,3];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('[a:1,b:2,3]/=[a:1,b:2,3] expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[a:1,b:2,3]/=[a:1,b:2,3];}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('[b:1,a:2,3]/=[a:1,b:2,3] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[b:1,a:2,3]/=[a:1,b:2,3];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('[1,2,3]<[2,3,4] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,3]<[2,3,4];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('["a","b","c"]<["b","c","d"] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=["a","b","c"]<["b","c","d"];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('["z","x","y"]<["b","c","d"] expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=["z","x","y"]<["b","c","d"];}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('[1,2,3]<[1,2,3] expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,3]<[1,2,3];}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('[2,3,4]<[1,2,3] expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[2,3,4]<[1,2,3];}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('[1,2,9]<[5,6,8] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,9]<[5,6,8];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('[1,2,3]<[9,9,9] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,3]<[9,9,9];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('[1,2,3]<[9] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,3]<[9];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('[a:1,b:2,c:3]<[2,3,4] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[a:1,b:2,c:3]<[2,3,4];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('["1","2","3"]<[2,3,4] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=["1","2","3"]<[2,3,4];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('[[1],"2","3"]<[2,3,4] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=["1","2","3"]<[2,3,4];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('[{1},[2],"3"]<[2,3,4] expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[{1},[2],"3"]<[2,3,4];}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('["a","b","c"]<["x","y","z"] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=["a","b","c"]<["x","y","z"];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('["a","b",1]<["x","y",9] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=["a","b",1]<["x","y",9];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('[1,2,3]>[2,3,4] expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,3]>[2,3,4];}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('[1,2,3]>[1,2,3] expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,3]>[1,2,3];}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('[2,3,4]>[1,2,3] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[2,3,4]>[1,2,3];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('[1,2,9]>[5,6,8] expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,9]>[5,6,8];}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('[1,2,3]>[9,9,9] expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,3]>[9,9,9];}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('[1,2,3]>[9] expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,3]>[9];}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('[2,3,4]>[a:1,b:2,c:3] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[2,3,4]>[a:1,b:2,c:3];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('["1","2","3"]>[2,3,4] expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=["1","2","3"]>[2,3,4];}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('[[1],"2","3"]>[2,3,4] expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[[1],"2","3"]>[2,3,4];}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('[{1},[2],"3"]>[2,3,4] expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[{1},[2],"3"]>[2,3,4];}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('["a","b","c"]>["x","y","z"] expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=["a","b","c"]>["x","y","z"];}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('["a","b",1]>["x","y",9] expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=["a","b",1]>["x","y",9];}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('["x","y",9]>["a","b",1] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=["x","y",9]>["a","b",1];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('[1,2,3]<=[1,2,3] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=["x","y",9]>["a","b",1];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('[1,2,3]<=[1,2,3] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,3]<=[1,2,3];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('[2,3,4]<=[1,2,3] expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[2,3,4]<=[1,2,3];}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('[1,2,9]<=[5,6,8] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,9]<=[5,6,8];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('[1,2,3]<=[9,9,9] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,3]<=[9,9,9];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('[1,2,3]<=[9] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,3]<=[9];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('[a:1,b:2,c:3]<=[2,3,4] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[a:1,b:2,c:3]<=[2,3,4];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('["1","2","3"]<=[2,3,4]; expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=["1","2","3"]<=[2,3,4];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('[[1],"2","3"]<=[2,3,4] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[[1],"2","3"]<=[2,3,4];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('[{1},[2],"3"]<=[2,3,4] expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[{1},[2],"3"]<=[2,3,4];}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('["a","b","c"]<=["x","y","z"] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=["a","b","c"]<=["x","y","z"];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('["a","b",1]<=["x","y",9] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=["a","b",1]<=["x","y",9];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('[[1,[2]],3]<=[[1,[2]],3] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[[1,[2]],3]<=[[1,[2]],3];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('[[1,{2}],3]<=[[1,[2]],3] expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[[1,{2}],3]<=[[1,[2]],3];}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('[a:1,b:2,3]<=[a:1,b:2,3] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[a:1,b:2,3]<=[a:1,b:2,3];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('[1,2,3]<=[a:1,2,3] expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,3]<=[a:1,2,3];}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test(' {1,2} < {1,3,2}  expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result={1,2} < {1,3,2};}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test(' {1,{2}} < {1,3,{2}}  expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result={1,{2}} < {1,3,{2}};}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test(' {1,[2]} < {1,3,[2]}  expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result={1,{2}} < {1,3,{2}};}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test(' {1,[a:2]} < {1,3,[2]}  expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result={1,[a:2]} < {1,3,[2]};}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test(' {1,[a:2]} < {1,3,[a:2]}  expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result={1,[a:2]} < {1,3,[a:2]};}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test(' {1,2,3} > {1,3}  expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result={1,2,3} > {1,3};}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test(' {1,2,{{{{3}}}}} > {1,{{{{3}}}}}  expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result={1,2,{{{{3}}}}} > {1,{{{{3}}}}};}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('!true expect false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=!true;}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('!false expect true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=!false;}@');
      let result1=state.get('result');
      expect(result1).toBe(!false);
  });
  test('! 1<-[1,2,3] expecte false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=! (1<-[1,2,3]);}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('true && true expecte true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=true&&true;}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('false && true expecte false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=false && true;}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('true || true expecte true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=true||true;}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('false || true expecte true', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=false || true;}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('false || false expecte false', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=false || false;}@');
      let result1=state.get('result');
      expect(result1).toBe(false);
  });
  test('2>1 && 3>2', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=2>1 && 3>2;}@');
      let result1=state.get('result');
      expect(result1).toBe(true);
  });
  test('#[1,2,3,4]', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=#[1,2,3,4];}@');
      let result1=state.get('result');
      expect(result1).toBe(4);
  });
  test('#[1,[2,3],4]', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=#[1,[2,3],4];}@');
      let result1=state.get('result');
      expect(result1).toBe(3);
  });
  test('#{1,2,3,4}', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=#{1,2,3,4};}@');
      let result1=state.get('result');
      expect(result1).toBe(4);
  });
  test('[1,2,3]++[1,2,3]', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,3]++[1,2,3];}@');
      let result1=state.get('result');
      expect(true).toBe(_.isEqual(result1,[1,2,3,1,2,3]));

  });
  test('[1,2,3]++[]', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,3]++[];}@');
      let result1=state.get('result');
      expect(true).toBe(_.isEqual(result1,[1,2,3]));
  });
  test('[]++[1,2,3]', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[]++[1,2,3];}@');
      let result1=state.get('result');
      expect(true).toBe(_.isEqual(result1,[1,2,3]));
  });
  test('a=[1,[a:2],3]++[1,2,3]; a[1].a', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{a=[1,[a:2],3]++[1,2,3]; result = a[1].a;}@');
      let result1=state.get('result');
      expect(true).toBe(_.isEqual(result1,2));
  });
  test('[1,2,3]--[1,2,3]', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,3]--[1,2,3];}@');
      let result1=state.get('result');
      expect(true).toBe(_.isEqual(result1,[]));
  });
  test('[1,2,3]--[]', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,3]--[];}@');
      let result1=state.get('result');
      expect(true).toBe(_.isEqual(result1,[1,2,3]));
  });
  test('[]--[1,2,3]', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[]--[1,2,3];}@');
      let result1=state.get('result');
      expect(true).toBe(_.isEqual(result1,[]));
  });
  test('a=[1,[a:2],3]--[1,2,3]', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,[a:2],3]--[1,2,3];}@');
      let result1=state.get('result');
      expect(true).toBe(_.isEqual(result1,[[2]]));
  });
  test('[4,5]\\/[1,2,3]', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[4,5]\\/[1,2,3];}@');
      let result1=state.get('result');
      expect(true).toBe(_.isEqual(result1,[4,5,1,2,3]));
  });
  test('[4,5,5,5]\\/[1,2,3,4]', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = [4,5,5,5]\\/[1,2,3,4];}@');
      let result1=state.get('result');
      expect(true).toBe(_.isEqual(result1,[4,5,1,2,3]));
  });
  test('[1,2,2,2,1]/\\[1,1,2,3]', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result=[1,2,2,2,1]/\\[1,1,2,3];}@');
      let result1=state.get('result');
      expect(true).toBe(_.isEqual(result1,[1,2]));
  });
  test('[1,2,2,2,1]/\\[3]', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = [1,2,2,2,1]/\\[3];}@');
      let result1=state.get('result');
      expect(true).toBe(_.isEqual(result1,[]));
  });
  test('"Hola"++" Mundo"', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = "Hola"++" Mundo";}@');
      let result1=state.get('result');
      expect(true).toBe(_.isEqual(result1,"Hola Mundo".split("")));
  });
  test('[0..10]', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = [0..10];}@');
      let result1=state.get('result');
      expect(true).toBe(_.isEqual(result1,[0,1,2,3,4,5,6,7,8,9,10]));
  });
  test('[0,2..10]', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result =[0,2..10];}@');
      let result1=state.get('result');
      expect(true).toBe(_.isEqual(result1,[0,2,4,6,8,10]));
  });
  test('[0,3..10]', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = [0,3..10];}@');
      let result1=state.get('result');
      expect(true).toBe(_.isEqual(result1,[0,3,6,9]));
  });
  test('[10,7..0]', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = [10,7..0];}@');
      let result1=state.get('result');
      expect(true).toBe(_.isEqual(result1,[10,7,4,1]));
  });
  test('[0,0.31..1]', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = [0,0.31..1];}@');
      let result1=state.get('result');
      expect(true).toBe(_.isEqual(result1,[0,0.31,0.62,0.9299999999999999]));
  });
  test('a=2+3;b=4;result = [1] if a>b else {1}', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{a=2+3;b=4;result = [1] if a>b else {1};}@');
      let result1=state.get('result');
      expect(true).toBe(_.isEqual(result1,[1]));
  });
  test('a=2+3;b=99;result = [1] if a>b else {2}', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{a=2+3;b=99;result = [1] if a>b else {2};}@');
      let result1=state.get('result');
      expect(true).toBe(_.isEqual([...result1],[2]));
  });
  test('{x * y for x <- [1..3], y <- [1..3], x <= y}', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{result = {x * y for x <- [1..3], y <- [1..3], x <= y};}@');
      let result1=state.get('result');
      expect(true).toBe(_.isEqual([...result1],[1,2,3,4,6,9]));
  });
  test('x = 2; if (x > 0) y = x; else y = -x', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{ x = 2; if (x > 0) y = x; else y = -x;}@');
      let result1=state.get('y');
      expect(result1).toBe(2);
  });
  test('x = -2; if (x > 0) y = x; else y = -x', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{ x = 2; if (x > 0) y = x; else y = -x;}@');
      let result1=state.get('y');
      expect(result1).toBe(2);
  });
  test('x = -45; if (x < 0) x = -x}', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{x = -45; if (x < 0) x = -x;}@');
      let result1=state.get('x');
      expect(result1).toBe(45);
  });
test('x = 45; if (x < 0) x = -x', () => {
      let state:State = testUtil.executeInterpreterForLazyPipol('@main:{x = 45; if (x < 0) {x = -x;}}@');
      let result1=state.get('x');
      expect(result1).toBe(45);
  });
});
