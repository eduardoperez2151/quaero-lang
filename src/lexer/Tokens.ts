export const tokens = {

  // Punctuation
  '<-':         '<-',
  '&&':         '&&',
  '||':         '||',
  '(':          '(',
  ')':          ')',
  '{':          '{',
  '}':          '}',
  '*':          '*',
  '/=':         '/=',
  '/\\':        '/\\',
  '/':          /\/(?!\*)/,
  '++':          '++',
  '+':          '+',
  '--':          '--',
  '-':          '-',
  ';':          ';',
  '<=':         '<=',
  '>=':         '>=',
  '<':          '<',
  '>':          '>',
  '==':         '==',
  '=':          '=',
  '!':          '!',
  '\[':         '\[',
  '\]':         '\]',
  ',':          ',',
  ':':          ':',
  '..':         '..',
  '.':          '.',
  '\\/':        '\\/',
  '#':          '#',
  '@':         '@',

  // Keywords
  'do':         'do',
  'while':      'while',
  'if':         'if',
  'then':       'then',
  'else':       'else',
  'true':       'true',
  'false':      'false',
  'length':     'length',
  'for':        'for',
  'null':       'null',
  'Infinity':   'Infinity',
  'NaN':        'NaN',
  'join':       'join',
  'signum':     'signum',
  'return':     'return',
  'main:':       'main:',

  // Atoms
  hex:          { match: /0[xX][0-9a-f-A-F]+/, value: (x: string) => (parseInt(x,16)) },
  //float:        { match: /[0-9]+(?:\.[0-9])*(?:[eE][-+]?[0-9]+)?/, value: (x: string) => (parseFloat(x)) },
  //float:       { match: /[0-9]+(?:\.?[0-9]*(?:[eE][-+]?[0-9]+)?)?/, value: (x: string) => (parseFloat(x)) },
  float:        { match: /[0-9]+(?:\.?(?!\.)[0-9]*(?:[eE][-+]?[0-9]+)?)?/, value: (x: string) => (parseFloat(x)) },
  integer:      { match: /[0-9]+/, value: (x: string) => (parseFloat(x)) },
  literal:      { match: /\"[^"\\\n]*(?:\\.[^"\\\n]*)*\"/, value: (x: string) => (x)}, // Strings
  identifier:   /[a-zA-Z_][a-zA-Z0-9_]*/,

  // Ignored tokens
  _comment:     { match: /\/\*.*?\*\//, lineBreaks: true },
  _ws:          { match: /[ \t\r\n\f\v]+/, lineBreaks: true },
};
