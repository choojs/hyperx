var React = require('react')
var toString = require('react-dom/server').renderToString
var hyperx = require('../')
var hx = hyperx(React.createElement)

var title = 'world'
var wow = [1,2,3]
var tree = hx`<div>
  <h1 y="ab${1+2}cd">hello ${title}!</h1>
  ${hx`<i>cool</i>`}
  wow
  ${wow.map(function (w, i) {
    return hx`<b>${w}</b>\n`
  })}
</div>`
console.log(toString(tree))
