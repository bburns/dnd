// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }


const moo = require('moo')

let lexer = moo.compile({
    //space: {match: /\s+/, lineBreaks: true},
    //true: 'true',
    //false: 'false',
    //null: 'null',
    line: { match: /----*\n/ },
    words: { match: /[^]+/, lineBreaks: true },
})

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "main$ebnf$1", "symbols": []},
    {"name": "main$ebnf$1", "symbols": ["main$ebnf$1", "block"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "main", "symbols": ["main$ebnf$1"], "postprocess": d=>`[${d.join(', ')}]`},
    {"name": "block", "symbols": ["_", (lexer.has("line") ? {type: "line"} : line), "name", (lexer.has("line") ? {type: "line"} : line), "contents"], "postprocess": d=>`{${d[2]}, ${d[4]}}`},
    {"name": "line", "symbols": [(lexer.has("line") ? {type: "line"} : line)], "postprocess": d=>null},
    {"name": "name$ebnf$1", "symbols": [/./]},
    {"name": "name$ebnf$1", "symbols": ["name$ebnf$1", /./], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "name", "symbols": ["name$ebnf$1", /[\n]/], "postprocess":  
        d => `"name":"${d[0].join('')}"` 
        },
    {"name": "contents", "symbols": [(lexer.has("words") ? {type: "words"} : words), {"literal":"----"}]},
    {"name": "props$ebnf$1", "symbols": []},
    {"name": "props$ebnf$1", "symbols": ["props$ebnf$1", "prop"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "props", "symbols": ["props$ebnf$1"], "postprocess": 
        function(d) {
          const props = d[0] // list of 0 or more prop json strings
          return props.join(', ')
        }
        },
    {"name": "prop$ebnf$1", "symbols": [/[^:]/]},
    {"name": "prop$ebnf$1", "symbols": ["prop$ebnf$1", /[^:]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "prop$ebnf$2", "symbols": [/./]},
    {"name": "prop$ebnf$2", "symbols": ["prop$ebnf$2", /./], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "prop", "symbols": ["prop$ebnf$1", /[:]/, "prop$ebnf$2", /[\n]/], "postprocess": 
        function(d) {
          const name = d[0].join('').trim()
          const value = d[2].join('').trim()
          return `"${name}": "${value}"`
        }
        }
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
