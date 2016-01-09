var dom = require('deku').dom
var element = require('deku').element
var createRenderer = dom.createRenderer
var hyperx = require('../..')
var hx = hyperx(element)

var render = createRenderer(document.querySelector('#content'))

var state = {
  times: 0
}

rerender()

function rerender () {
  render(hx`<div>
    <h1>clicked ${state.times} times</h1>
    <button onClick=${increment}>click me!</button>
  </div>`)

  function increment () {
    state.times += 1
    rerender()
  }
}
