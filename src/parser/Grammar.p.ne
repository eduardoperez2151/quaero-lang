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
  Negation,
  Numeral,
  Literal,
  LengthExp,
  Sequence,
  Substraction,
  TruthValue,
  Variable,
  IfElse,
  Index
} from '../ast/AST';

import { tokens } from './Tokens';
import { MyLexer } from './Lexer';

const lexer = new MyLexer(tokens);

%}

@lexer lexer


######### Program ############

program ->
   "@" function:* body "@"  {% ([, functions, body,]) => (new Program(functions, body)) %}

####### Function #############

function ->
  "function" identifier args body  {% ([, identifier, ,args, ,body]) => (new Function(indentifier,args,body)) %}

body ->
  "{" stmt:* "}"   {% ([, statements, ]) => (new Sequence(statements)) %}

args->
  "(" ")"                   {% () => (new Array()) %}
  | "(" argsList ")"        {% id %}

argsList ->
  identifier                {% ([identifier]) => [identifier]) %}
  identifier "," argsList   {% ([identifier, ,argsList]) => ({argsList.push(identifier); return argsList;}) %}



callFunction ->
  identifier params         {% ([identifier,params]) => (new CallFunction(indentifier,params)) %}

params->
  "(" ")"                   {% () => (new Array()) %}
  | "(" expList ")"        {% id %}

expList ->
  exp                   {% ([exp]) => [exp]) %}
  exp "," expList   {% ([exp, ,expList]) => ({expList.push(exp); return expList;}) %}


stmt ->
    stmtelse                              {% id %}
  | "if" "(" exp ")" stmt                  {% ([, , cond, , thenBody]) => (new IfThen(cond, thenBody)) %}

stmtelse ->
  exp";"                                      {% id %}
  |identifier "=" exp ";"                     {% ([id, , exp, ]) => (new Assignment(id, exp)) %}
  | "{" stmt:* "}"                            {% ([, statements, ]) => (new Sequence(statements)) %}
  | "if" "(" exp ")" stmtelse "else" stmt     {% ([, ,cond, , thenBody, , elseBody]) => (new IfThenElse(cond, thenBody, elseBody)) %}
  | "for" "(" expList ")" stmt                {% ([, ,expList, ,stmt]) => (new For(expList, stmt)) %}


# Expression

list->
  "[" "]"                   {% () => ([]) %}
  | "[" listItem "]"        {% id %}

listItem ->
  exp                               {% ([exp]) => [exp]) %}
 |identifier ":" exp                {% ([identifier, ,exp ]) => [new KeyValue(identifier,exp)]) %}
 |exp "," listItem                  {% ([exp, ,listItem]) => ({listItem.push(exp); return listItem;}) %}
 |identifier ":" exp "," listItem   {% ([identifier, ,exp, ,listItem]) => ({listItem.push(new KeyValue(identifier,exp)); return listItem;}) %}

exp ->
    exp "&&" comp               {% ([lhs, , rhs]) => (new Conjunction(lhs, rhs)) %}
  | exp "||" comp               {% ([lhs, , rhs]) => (new Disjunction(lhs, rhs)) %}
  | comp "if" exp "else" comp   {% ([lhs, ,cexp, ,rhs]) => (new IfElse(lhs,cexp,rhs)) %}
  | exp "[" comp "]"            {% ([exp, ,index,]) => (new Index(exp,index)) %}
  | comp                        {% id %}

comp ->
    comp "==" addsub        {% ([lhs, , rhs]) => (new CompareEqual(lhs, rhs)) %}
  | comp "!=" addsub        {% ([lhs, , rhs]) => (new CompareNotEqual(lhs, rhs)) %}
  | comp "<=" addsub        {% ([lhs, , rhs]) => (new CompareLessOrEqual(lhs, rhs)) %}
  | comp "<" addsub         {% ([lhs, , rhs]) => (new CompareLess(lhs, rhs)) %}
  | comp ">=" addsub        {% ([lhs, , rhs]) => (new CompareGreatOrEqual(lhs, rhs)) %}
  | comp ">" addsub         {% ([lhs, , rhs]) => (new CompareGreat(lhs, rhs)) %}
  | addsub                  {% id %}

addsub ->
    addsub "+" muldiv       {% ([lhs, , rhs]) => (new Addition(lhs, rhs)) %}
  | addsub "-" muldiv       {% ([lhs, , rhs]) => (new Substraction(lhs, rhs)) %}
  | muldiv                  {% id %}

muldiv ->
    muldiv "*" neg          {% ([lhs, , rhs]) => (new Multiplication(lhs, rhs)) %}
  | muldiv "/" neg          {% ([lhs, , rhs]) => (new Division(lhs, rhs)) %}
  | neg                     {% id %}

neg ->
    "!" value               {% ([, exp]) => (new Negation(exp)) %}
  | value                   {% id %}

value ->
    "(" exp ")"             {% ([, exp, ]) => (exp) %}
  | list                    {% id %}
  | number                  {% ([num]) => (new Numeral(num)) %}
  | "length" "(" addsub ")" {% ([, ,exp,]) => (new LengthExp(exp)) %}
  | "true"                  {% () => (new TruthValue(true)) %}
  | "false"                 {% () => (new TruthValue(false)) %}
  | identifier              {% ([id]) => (new Variable(id)) %}
  | string                  {% ([id]) => (new Literal(id)) %}


# Atoms

identifier ->
    %identifier             {% ([id]) => (id.value) %}

number ->
    %integer                {% ([id]) => (parseInt(id.value)) %}
  | %hex                    {% ([id]) => (parseInt(id.value)) %}
  | %float                  {% ([id]) => (parseFloat(id.value)) %}

string ->
    %string                {% ([id]) => (id.value) %}
