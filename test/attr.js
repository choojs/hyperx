var test = require('tape')
var vdom = require('virtual-dom')
var hyperx = require('../')
var hx = hyperx(vdom.h)

test('class', function (t) {
  var tree = hx`<div class="wow"></div>`
  t.equal(vdom.create(tree).toString(), '<div class="wow"></div>')
  t.end()
})

test('boolean attribute', function (t) {
  var tree = hx`<video autoplay />`
  t.equal(vdom.create(tree).toString(), '<video autoplay />')
  t.end()
})
