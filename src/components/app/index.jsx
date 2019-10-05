import React from 'react';
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'
import 'normalize.css'
// import remarkGridTables from 'remark-grid-tables'
import dragon from '../../assets/images/dragon-192x192x256.png'
import rules from '../../assets/rules.json'
import TableOfContents from '../toc'
import * as lib from '../../lib'
import './styles.css'
import './print.css'
import { arrayToTree } from 'performant-array-to-tree'


// just include headers and dnd rules
// const dndRules = rules.filter(rule => (!rule.parentId) || (!!rule.dnd))

// const levels = lib.groupBy(dndRules, 'parentId') //.filter(level => level.parentId!=='none')
// const levels = lib.groupBy(rules, 'parentId') //.filter(level => level.parentId!=='none')
// console.log(levels)
console.log(rules)
const levels = arrayToTree(rules)
console.log(levels)



export default function() {
  return (
    <div className="app">
      <Header />
      <div className="app-contents">
        <TableOfContents levels={levels} />
        <div className="app-page">
          <Levels levels={levels} />
        </div>
      </div>
    </div>
  )
}


function Header() {
  return (
    <div className="app-header" role="banner">
      <img src={dragon} alt=""/>
      <h1 className="h1">Dungeons &amp; Dragons Rules</h1>
    </div>
  )
}


function Levels({ levels }) {
  return (
    <div className="app-rules">
      {levels.map(level => <Level key={level.id} level={level} />)}
    </div>
  )
}


function Level({ level }) {
  return (
    <div className="app-rules-section" id={level.id}>
      <h2>
        {level.name}
      </h2>
      <div className="level-contents">
        {level.contents}
      </div>
      <div className="body rule-list">
        {level.children && level.children.map(rule => <Rule key={rule.id} rule={rule} />)}
      </div>
    </div>
  )
}


function Rule({ rule }) {
  return (
    <div key={rule.name} id={rule.id} className="rule">
      <h3>{rule.name}</h3>
      {(rule.contents || rule.dnd) && 
        <div className="rule-body">
          {markdownToReact(rule.contents)}
          <div className="rule-reference">{rule.dnd}</div>
        </div>
      }
    </div>
  )
}


// using https://github.com/remarkjs/remark-react
function markdownToReact(md) {
  return (
    <div id="preview">
      {
        unified()
          .use(parse) // remark-parse
          // .use(remarkGridTables)
          .use(remark2react)
          .processSync(md).contents
      }
    </div>
  )
}
