@preprocessor typescript

@{%

import {
  Addition,
  Assignment,
  CompareEqual,
  CompareNotEqual,
  CompareLessOrEqual,
  CompareLess,
  CompareGreatOrEqual,
  CompareGreat,
  ComprehensionList,
  ComprehensionSet,
  Conjunction,
  Disjunction,
  EnumerationList,
  EnumerationSet,
  ExpAsStmt,
  IfThenElse,
  IfThen,
  Multiplication,
  Division,
  Negation,
  SetCollection,
  ListCollection,
  Concatenation,
  Difference,
  Union,
  Intersection,
  Membership,
  Opposite,
  Cardinal,
  Dot,
  Numeral,
  Literal,
  LengthExp,
  Sequence,
  Subtraction,
  TruthValue,
  Variable,
  IfElse,
  Program,
  For,
  Function,
  CallFunction,
  KeyValue,
  Index,
  Return,
  CBoolean,
  CInt,
  CNumber,
  Mod,
  Null,
  Div,
  CString,
  PrintFunction,
} from '../ast/AST';

import { tokens } from "../lexer/Tokens";
import { MyLexer } from "../lexer/Lexer"

const lexer = new MyLexer(tokens);

%}

@lexer lexer


######## PROGRAM ########

program ->
"@"  function:* "main:" body "@"        		                              {%  ([,functions, ,body,]) => (new Program(functions, body)) %}

srt ->
      statements                                                      {% id %}
######## FUNCTION ########

function ->
  "function" identifier arguments body 	                              {%  ([ ,identifier,args,body]) => (new Function(identifier,args,body)) %}

body ->
  "{" statements:*  "}"   			                                      {% ([, statements, ]) => (new Sequence(statements)) %}

arguments->
  "(" ")"                   			                                    {%  ()                    =>  ([])            %}
  | "(" argumentList  ")"        			                                {%  ([, argumentList, ])  =>  (argumentList)  %}

argumentList ->
  identifier                		  	                                  {%  ([identifier])                  =>  ([identifier])                                          %}
  | identifier  "," argumentList   		                                {%  ([identifier, , argumentList])  =>  {argumentList.unshift(identifier); return argumentList;} %}

######## CALL FUNCTION ########

callFunction ->
  identifier parameters        		                                    {%  ([identifier, parameters]) => (new CallFunction(identifier,parameters)) %}

parameters->
  "(" ")"                   			                                    {%  ()                      =>  ([])              %}
  | "(" expressionList  ")"        			                              {%  ([, expressionList, ])  =>  (expressionList)  %}

######## STATEMENTS ########

statements ->
    statementsElse                             		                    {%  id  %}
  | "if"  "(" expression  ")" statements                  	          {%  ([, , condition, , body]) =>  (new IfThen(condition, body)) %}

statementsElse ->
  expression  ";"                                                     {%  ([expression, ])                      =>  (new ExpAsStmt(expression))                 %}
  | function                                                          {% id %}
  | identifier  "=" expression  ";"                                   {%  ([identifier, , expression, ])        =>  (new Assignment(identifier, expression))    %}
  | "{" statements:*  "}"                                             {%  ([, statements, ])                    =>  (new Sequence(statements))                  %}
  | "return" expression ";"                                           {% ([ , exp,])                             =>  (new Return(exp))                           %}
  | "if"  "(" expression ")"  statementsElse  "else"  statements      {%  ([, ,condition, , body, , elseBody])  =>  (new IfThenElse(condition, body, elseBody)) %}
  | "for" "(" expressionList ")"  statements                          {%  ([, , expressionList, , statements])  =>  (new For(expressionList, statements))       %}

######## EXPRESSIONS ######## CHECKED!!!!
expressionList ->
  expression                   			                                  {%  ([expression])                    =>  ([expression])                                              %}
  | expression  "," expressionList   			                            {%  ([expression, , expressionList])  =>  {expressionList.unshift(expression); return expressionList;} %}

collection ->
  list 				                                                        {%  id  %}
  | set 				                                                      {%  id  %}

set ->
  "{" "}"				                                                      {%  ([,])                                               =>  (new SetCollection())                                       %}
 | "{" expression  ".."  expression  "}"                              {%  ([, firstElement, , lastElement, ])                 =>  (new EnumerationSet(firstElement,lastElement))              %}
 | "{" expression  ","   expression  ".."  expression  "}"            {%  ([, firstElement, , nextElement, , lastElement, ])  =>  (new EnumerationSet(firstElement,lastElement,nextElement))  %}
 | "{" expression "for" expressionList "}"                            {%  ([, expression , ,expList, ])                       =>  (new ComprehensionSet(expression,expList))                  %}
 | "{" collectionItem  "}"        			                              {%  ([, collectionItem, ])                              =>  (new SetCollection(collectionItem))                         %}


list->
  "[" "]"                   			                                    {%  ()                                                  =>  (new ListCollection())                                      %}
  | "[" expression  ".."  expression  "]"                             {%  ([, firstElement, , lastElement, ])                 =>  (new EnumerationList(firstElement,lastElement))             %}
  | "[" expression  ","   expression  ".."  expression  "]"           {%  ([, firstElement, , nextElement, , lastElement, ])  =>  (new EnumerationList(firstElement,lastElement,nextElement)) %}
  | "[" expression "for" expressionList "]"                           {%  ([, expression , ,expList, ])                       =>  (new ComprehensionList(expression,expList))                 %}
  | "[" collectionItem "]"       			                          {%  ([, collectionItem, ])                              =>  (new ListCollection(collectionItem))                        %}


collectionItem ->
  expression                                                          {%  ([expression])                                =>  ([expression])                                                                        %}
 |  key  ":" expression                                               {%  ([identifier, ,expression ])                  =>  ([new KeyValue(identifier,expression)])                                               %}
 |  expression  "," collectionItem                                    {%  ([expression, ,collectionItem])               =>  {collectionItem.unshift(expression); return collectionItem;}                             %}
 |  key  ":" expression  "," collectionItem                           {%  ([identifier, ,expression, ,collectionItem])  =>  {collectionItem.unshift(new KeyValue(identifier,expression)); return collectionItem;}    %}

expression ->
    expression "&&" comparison                                        {%  ([leftHandSide, , rightHandSide])             =>  (new Conjunction(leftHandSide, rightHandSide))      %}
  | expression "||" comparison                                        {%  ([leftHandSide, , rightHandSide])             =>  (new Disjunction(leftHandSide, rightHandSide))      %}
  | comparison "if" expression "else" comparison                      {%  ([leftHandSide, ,expression, ,rightHandSide]) =>  (new IfElse(leftHandSide,expression,rightHandSide)) %}
  | comparison                                                        {%  id  %}

comparison ->
    comparison  "=="  additionSubstraction                            {%  ([leftHandSide, , rightHandSide]) =>  (new CompareEqual(leftHandSide, rightHandSide))         %}
  | comparison  "/="  additionSubstraction                            {%  ([leftHandSide, , rightHandSide]) =>  (new CompareNotEqual(leftHandSide, rightHandSide))      %}
  | comparison  "<="  additionSubstraction                            {%  ([leftHandSide, , rightHandSide]) =>  (new CompareLessOrEqual(leftHandSide, rightHandSide))   %}
  | comparison  "<"   additionSubstraction                            {%  ([leftHandSide, , rightHandSide]) =>  (new CompareLess(leftHandSide, rightHandSide))          %}
  | comparison  ">="  additionSubstraction                            {%  ([leftHandSide, , rightHandSide]) =>  (new CompareGreatOrEqual(leftHandSide, rightHandSide))  %}
  | comparison  ">"   additionSubstraction                            {%  ([leftHandSide, , rightHandSide]) =>  (new CompareGreat(leftHandSide, rightHandSide))         %}
  | additionSubstraction                                              {%  id  %}

additionSubstraction ->
    additionSubstraction  "+"   multiplicationDivision                {%  ([leftHandSide, , rightHandSide]) =>  (new Addition(leftHandSide, rightHandSide))       %}
  | additionSubstraction  "-"   multiplicationDivision                {%  ([leftHandSide, , rightHandSide]) =>  (new Subtraction(leftHandSide, rightHandSide))   %}
  | additionSubstraction  "++"  multiplicationDivision                {%  ([leftHandSide, , rightHandSide]) =>  (new Concatenation(leftHandSide, rightHandSide))  %}
  | additionSubstraction  "--"  multiplicationDivision                {%  ([leftHandSide, , rightHandSide]) =>  (new Difference(leftHandSide, rightHandSide))     %}
  | multiplicationDivision                                            {%  id  %}

multiplicationDivision ->
    multiplicationDivision  "*"   negation                            {%  ([leftHandSide, , rightHandSide]) =>  (new Multiplication(leftHandSide, rightHandSide)) %}
  | multiplicationDivision  "/"   negation                            {%  ([leftHandSide, , rightHandSide]) =>  (new Division(leftHandSide, rightHandSide))       %}
  | multiplicationDivision  "\\/" negation                            {%  ([leftHandSide, , rightHandSide]) =>  (new Union(leftHandSide, rightHandSide))          %}
  | multiplicationDivision  "/\\" negation                            {%  ([leftHandSide, , rightHandSide]) =>  (new Intersection(leftHandSide, rightHandSide))   %}
  | membership                                                        {%  id  %}

membership ->
  negation                                                            {%  id  %}
  | membership  "<-"  negation                                        {% ([value, ,listValues]) => (new Membership(value,listValues)) %}

negation ->
    "!" value                                                         {%  ([, value])     => (new Negation(value))      %}
  | "-" negation                                                      {%  ([, negation])  => (new Opposite(negation))    %}
  | value                                                             {%  id  %}

value ->
  "(" expression  ")"                                                 {%  ([, expression, ])      =>  (expression)                %}
  | collection                                                        {%  id  %}
  | number                                                            {%  ([number])              =>  (new Numeral(number))       %}
  | "length"  "(" additionSubstraction  ")"                           {%  ([, ,expression,])      =>  (new LengthExp(expression)) %}
  | "#" value                                                         {%  ([, list])              =>  (new Cardinal(list))        %}
  | value  "[" value "]"                                              {%  ([list, , index,])      =>  (new Index(list,index))     %}
  | value  "." key                                                    {%  ([collection, ,key])    =>  (new Dot(collection,key))   %}
  | "true"                                                            {%  ()                      =>  (new TruthValue(true))      %}
  | "false"                                                           {%  ()                      =>  (new TruthValue(false))     %}
  | identifier                                                        {%  ([id])                  =>  (new Variable(id))          %}
  | literal                                                           {%  ([id])                  =>  (new Literal(id))           %}
  | callFunction                                                      {%                      id                                  %}
  | "null"                                                            {%  ()                      =>  (new Null())                %}
  | "boolean"  "(" expression  ")"                                    {%  ([, ,expression,])      =>  (new CBoolean(expression))  %}
  | "int"  "(" expression  ")"                                        {%  ([, ,expression,])      =>  (new CInt(expression))      %}
  | "number"  "(" expression  ")"                                     {%  ([, ,expression,])      =>  (new CNumber(expression))   %}
  | "mod"  "(" expression "," expression  ")"                         {%  ([, ,exp1 ,, exp2,])     =>  (new Mod(exp1, exp2))      %}
  | "div"  "(" expression "," expression  ")"                         {%  ([, ,exp1 ,, exp2,])     =>  (new Div(exp1, exp2))      %}
  | "string"  "(" expression  ")"                                     {%  ([, ,expression,])      =>  (new CString(expression))  %}
  | "print"  "(" expression  ")"                                      {%  ([, ,expression,])      =>  (new PrintFunction(expression)) %}
key ->
  identifier                                                          {%  id  %}
  | literal                                                           {%  id  %} ##Bruno:se deberia de poder?; Edu:Creo que no  ej lista=[1,2,3,x:4], lista["x"] es igual a lista.x pero no deberiamos de poder llamar lista."x" esto no deberia ser asi, capaz me equivoco :\

# Atoms

identifier ->
    %identifier                                                       {% ([identifier]) => (identifier.value) %}

number ->
  %integer                                                            {%  ([integer])   =>  (parseInt(integer.value)) %}
  | %hex                                                              {%  ([hex])       =>  (parseInt(hex.value))     %}
  | %float                                                            {%  ([float])     =>  (parseFloat(float.value)) %}
  | %Infinity                                                         {%  ([])     =>  (Number.POSITIVE_INFINITY) %}
  | %NaN                                                              {%  ([])    =>  (Number.NaN) %}

literal ->
  %literal                                                            {%  ([literal]) => (literal.value) %}
