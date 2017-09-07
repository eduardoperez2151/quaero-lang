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
  DoWhile,
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
  WhileDo,
  WhileDoElse,
  IfElse,
  Index
} from '../ast/AST';

import { tokens } from './Tokens';
import { MyLexer } from './Lexer';

const lexer = new MyLexer(tokens);

%}

@lexer lexer


# Statements

stmt ->
    stmtelse                              {% id %}
  | "if" exp "then" stmt                  {% ([, cond, , thenBody]) => (new IfThen(cond, thenBody)) %}

stmtelse ->
    identifier "=" exp ";"                  {% ([id, , exp, ]) => (new Assignment(id, exp)) %}
  | "{" stmt:* "}"                          {% ([, statements, ]) => (new Sequence(statements)) %}
  | "while" exp "do" stmt                   {% ([, cond, , body]) => (new WhileDo(cond, body)) %}
  | "while" exp "do" stmt "else" stmt       {% ([, cond, , doBody, ,elseBody]) => (new WhileDoElse(cond, doBody, elseBody)) %}
  | "do" stmt "while" exp                   {% ([, body, , cond]) => (new DoWhile(body, cond)) %}
  | "if" exp "then" stmtelse "else" stmt    {% ([, cond, , thenBody, , elseBody]) => (new IfThenElse(cond, thenBody, elseBody)) %}


# Expressions

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
