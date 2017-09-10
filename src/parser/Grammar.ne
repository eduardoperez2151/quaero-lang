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
  Conjunction,
  Disjunction,
  IfThenElse,
  IfThen,
  Multiplication,
  Division,
  Negationation,
  SetCollection,
  ListCollection,
  Concatenation,
  Difference,
  Union,
  Intersection,
  Membership,
  Oposite,
  Cardinal,
  Dot,
  Numeral,
  Literal,
  LengthExp,
  Sequence,
  Substraction,
  TruthValue,
  Variable,
  IfElse,
  Program;
  For,
  Function,
  CallFunction,
  KeyValue,
  Index
} from '../ast/AST';

import { tokens } from './Tokens';
import { MyLexer } from './Lexer';

const lexer = new MyLexer(tokens);

%}

@lexer lexer


######## PROGRAM ########

program ->
  "@"  function:*  body "@"        		                                {%  ([, functions, body,]) => (new Program(functions, body)) %}

######## FUNCTION ########

function ->
  "function"  identifier  arguments body 	                            {%  ([, identifier, , arguments, , body]) => (new Function(identifier,arguments,body)) %}

body ->
  "{" statements:*  "}"   			                                      {% ([, statements, ]) => (new Sequence(statements)) %}

arguments->
  "(" ")"                   			                                    {%  ()                    =>  ([])            %}
  | "(" argumentList  ")"        			                                {%  ([, argumentList, ])  =>  (argumentList)  %}

argumentList ->
  identifier                		  	                                  {%  ([identifier])                  =>  ([identifier])                                          %}
  | identifier  "," argumentList   		                                {%  ([identifier, , argumentList])  =>  ({argumentList.push(identifier); return argumentList;}) %}

######## CALL FUNCTION ########

callFunction ->
  identifier  parameters        		                                  {%  ([identifier, parameters]) => (new CallFunction(identifier,parameters)) %}

parameters->
  "(" ")"                   			                                    {%  ()                      =>  ([])              %}
  | "(" expressionList  ")"        			                              {%  ([, expressionList, ])  =>  (expressionList)  %}

expressionList ->
  expression                   			                                  {%  ([expression])                    =>  ([expression])                                              %}
  | expression  "," expressionList   			                            {%  ([expression, , expressionList])  =>  ({expressionList.push(expression); return expressionList;}) %}

######## STATEMENTS ########

statements ->
    statementsElse                             		                    {%  id  %}
  | "if"  "(" expression  ")" statements                  	          {%  ([, , condition, , body]) =>  (new IfThen(condition, body)) %}

statementsElse ->
  expression  ";"                                                     {%  ([expression, ])                      =>  (expression)                                %}
  | identifier  "=" expression  ";"                                   {%  ([identifier, , expression, ])        =>  (new Assignment(identifier, expression))    %}
  | "{" statements:*  "}"                                             {%  ([, statements, ])                    =>  (new Sequence(statements))                  %}
  | "if"  "(" expression ")"  statementsElse  "else"  statements      {%  ([, ,condition, , body, , elseBody])  =>  (new IfThenElse(condition, body, elseBody)) %}
  | "for" "(" expressionList ")"  statements                          {%  ([, , expressionList, , statements])  =>  (new For(expressionList, statements))       %}
  
######## EXPRESSIONS ######## CHECKED!!!!

collection ->
  list 				                                                        {%  id  %}
  | set 				                                                      {%  id  %}

set ->
  "{" "}"				                                                      {%  ()                                                  =>  (new SetCollection())                                       %}
  | "{" expression  ".."  expression  "}"                             {%  ([, firstElement, , lastElement, ])                 =>  (new EnumerationSet(firstElement,lastElement))              %}
  | "{" expression  ","   expression  ".."  expression  "}"           {%  ([, firstElement, , nextElement, , lastElement, ])  =>  (new EnumerationSet(firstElement,nextElement,lastElement))  %}
  | "{" expression statements "}"                                     {%  ([, expression ,statement, ])                       =>  (new ComprehensionSet(expression,statement))                %}  
  | "{" collectionItem  "}"        			                              {%  ([, collectionItem, ])                              =>  (new SetCollection(collectionItem))                         %}


list->
  "[" "]"                   			                                    {%  ()                                                  =>  (new ListCollection())                                      %}
  | "[" expression  ".."  expression  "]"                             {%  ([, firstElement, , lastElement, ])                 =>  (new EnumerationList(firstElement,lastElement))             %}
  | "[" expression  ","   expression  ".."  expression  "]"           {%  ([, firstElement, , nextElement, , lastElement, ])  =>  (new EnumerationList(firstElement,nextElement,lastElement)) %}
  | "[" expression statements "]"                                     {%  ([, expression ,statement, ])                       =>  (new ComprehensionList(expression,statement))               %}
  | "[" collectionItem "]"       			                                {%  ([, collectionItem, ])                              =>  (new ListCollection(collectionItem))                        %}


collectionItem ->
  expression                                                          {%  ([expression])                                =>  ([expression])                                                                        %}
 |  identifier  ":" expression                                        {%  ([identifier, ,expression ])                  =>  ([new KeyValue(identifier,expression)])                                               %}
 |  expression  "," collectionItem                                    {%  ([expression, ,collectionItem])               =>  ({collectionItem.push(expression); return collectionItem;})                           %}
 |  identifier  ":" expression  "," collectionItem                    {%  ([identifier, ,expression, ,collectionItem])  =>  ({collectionItem.push(new KeyValue(identifier,expression)); return collectionItem;})  %}

expression ->
    expression "&&" comparison                                        {%  ([leftHandSide, , rightHandSide])             =>  (new Conjunction(leftHandSide, rightHandSide))      %}
  | expression "||" comparison                                        {%  ([leftHandSide, , rightHandSide])             =>  (new Disjunction(leftHandSide, rightHandSide))      %}
  | comparison "if" expression "else" comparison                      {%  ([leftHandSide, ,expression, ,rightHandSide]) =>  (new IfElse(leftHandSide,expression,rightHandSide)) %}
  | expression "[" comparison "]"                                     {%  ([expression, ,comparison,])                  =>  (new Index(expression,comparison))                  %}
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
  | additionSubstraction  "-"   multiplicationDivision                {%  ([leftHandSide, , rightHandSide]) =>  (new Substraction(leftHandSide, rightHandSide))   %}
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
    "!" value                                                         {%  ([, value])     => (new Negationation(value)) %}
  | "-" negation                                                      {%  ([, negation])  => (new Oposite(negation))    %}
  | value                                                             {%  id  %}

value ->
  "(" expression  ")"                                                 {%  ([, expression, ])      =>  (expression)                %}
  | list                                                              {%  id  %}
  | number                                                            {%  ([number])              =>  (new Numeral(number))       %}
  | "length"  "(" additionSubstraction  ")"                           {%  ([, ,expression,])      =>  (new LengthExp(expression)) %}
  | "#" list                                                          {%  ([, list])              =>  (new Cardinal(list))        %}
  | list  "[" value "]"                                               {%  ([list, , index,])      =>  (new Index(list,index))     %}
  | collection  "." key                                               {%  ([collection, ,key])    =>  (new Dot(collection,key))   %}
  | "true"                                                            {%  ()                      =>  (new TruthValue(true))      %}
  | "false"                                                           {%  ()                      =>  (new TruthValue(false))     %}
  | identifier                                                        {%  ([id])                  =>  (new Variable(id))          %}
  | literal                                                           {%  ([id])                  =>  (new Literal(id))           %}

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

literal ->
  %literal                                                            {%  ([literal]) => (literal.value) %}