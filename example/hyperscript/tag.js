var jsx = require('../../')
var h = require('hyperscript')
var hx = jsx(h)

var title = 'world'
var wow = [1,2,3]
var tree = hx`<div x=5>
  <h1 y="333">hello ${title}!</h1>
  ${hx`<i>cool</i>`}
  wow
  ${wow.map(function (w) {
    return hx`<b>${w}</b>\n`
  })}
</div>`
console.log(tree.outerHTML)
