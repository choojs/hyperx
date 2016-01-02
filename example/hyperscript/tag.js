var jsx = require('../../')
var h = require('hyperscript')
var hx = jsx(h)

var title = 'world'
var wow = [1,2,3]
console.log(hx`<div>
  <h1>hello ${title}!</h1>
  ${wow.map(function (w) {
    return hx`<b>${w}</b>\n`
  })}
</div>`)
