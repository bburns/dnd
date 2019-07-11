import React from 'react';
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'
import 'sanitize.css'

import rules from '../../assets/rules.json'
import './devhints.css'
import './styles.css';
import dragon from '../../assets/dragon-192x192x256.png'


function idize(s) {
  return s.replace(/ /g, '-').toLowerCase()
}

function groupBy(arr, key) {
  const d = {}
  arr.forEach(el => {
    const keyValue = el[key]
    d[keyValue] = d[keyValue] || []
    d[keyValue].push(el)
  })
  const ret = []
  for (let keyValue of Object.keys(d)) {
    const group = { [key]: keyValue, values: d[keyValue] }
    ret.push(group)
  }
  return ret
}



// using https://github.com/remarkjs/remark-react
function markdownToReact(md) {
  return (
    <div id="preview">
      {
        unified()
          .use(parse)
          .use(remark2react)
          .processSync(md).contents
      }
    </div>
  )
}


const rulesByLevel = groupBy(rules, 'level')

function Rule({rule}) {
  return (
    <div key={rule.name} id={idize(rule.name)} className="rule">
      <h3>{rule.name}</h3>
      {rule.description && <div className="body">
        {markdownToReact(rule.description)}
      </div>}
    </div>
  )
}


function App() {
  // const [rules, setRules] = React.useState([])
  // React.useEffect(async () => {
  //   const data = await axios.get(url)
  // }, [])

  return (
    <div className="app">
      <header className="app-header" role="banner">
        <h1 className="h1"><img src={dragon} alt=""/>Dungeons &amp; Dragons Rules</h1>
      </header>
      <div className="app-contents">
        <div className="toc">
          {rulesByLevel.map(level => (
            <div className="toc-level">
              <a className="toc-level-title" key={level.Level} href={"#" + level.Level}>Level {level.Level}</a>
              <div className="toc-rules">
                {level.values.map(rule => (
                  <a className="toc-rule" key={rule.name} href={"#" + idize(rule.name)}>
                    {rule.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="app-rules">
          {rulesByLevel.map(level => (
            <div className="h2-sect">
              <h2 className="body-level">Level {level.Level}</h2>
              <div className="body rule-list">
                {level.values.map(rule => <Rule key={rule.name} rule={rule} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
