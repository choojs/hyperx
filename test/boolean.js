var test = require('tape')
var vdom = require('virtual-dom')
var hyperx = require('../')
var hx = hyperx(vdom.h)

test('boolean attribute', function (t) {
  var tree = hx`<video autoplay volume=5></video>`
  console.log(tree)
  t.equal(vdom.create(tree).toString(), '<video autoplay="true" volume="5"></video>')
  t.end()
})

test('boolean attribute last', function (t) {
  var tree = hx`<video autoplay></video>`
  t.equal(vdom.create(tree).toString(), '<video autoplay="true"></video>')
  t.end()
})
