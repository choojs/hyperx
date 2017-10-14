var test = require('tape')
var vdom = require('virtual-dom')
var hyperx = require('../')
var hx = hyperx(vdom.h)

test('self closing tag should close', function (t) {
  var tree = hx`<div>Hello <br /> World</div>`
  t.equal(vdom.create(tree).toString(), '<div>Hello <br /> World</div>')
  t.end()
})

test('custom self closing tag should close', function (t) {
  var tree = hx`<div><self-closing-tag />Hello World</div>`
  t.equal(vdom.create(tree).toString(), '<div><self-closing-tag></self-closing-tag>Hello World</div>')
  t.end()
})
