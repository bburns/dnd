const nearley = require("nearley");
const grammar = require("./grammar.js");

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

// Parse something!
// parser.feed(`----\n`)
// parser.feed(`trinity\n`)
// parser.feed(`-----
// trinity
// -----
// type: person
// nickname: ducky
// height: 6ft
// so trinity aka ducky goes to sunnydale high school.



// --------
// # Neo #
// --------
// height: 7ft
// neo is 'the one'

// `)

parser.feed(`

---------------------------------------------------------------------------
# Basic #
---------------------------------------------------------------------------
asdasd

---------------------------------------------------------------------------
## Ability Score ##
---------------------------------------------------------------------------

Measures of different abilities: 

* Strength
* Dexterity
* Constitution
* Intelligence
* Wisdom
* Charisma

Max 20 for characters, 30 for monsters/divines. Used to calculate [Ability Modifiers]. Each has associated [Skills], e.g. Strength has Athletics.

dnd: ph12,173
subtype: char

----
`)


// parser.results is an array of possible parsings.
// console.log(parser.results) // [[[[ "foo" ],"\n" ]]]
console.log('results', parser.results.length)
console.log(parser.results[0]) // [[[[ "foo" ],"\n" ]]]
// console.log(JSON.stringify(parser.results)) // [[[[ "foo" ],"\n" ]]]
// const s = parser.results[0]
// console.log(JSON.parse(s))

