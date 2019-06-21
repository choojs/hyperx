var test = require('tape')
var vdom = require('virtual-dom')
var hyperx = require('../')
var hx = hyperx(vdom.h)

test('undefined value (empty)', function (t) {
  var tree = hx`<div>${undefined}</div>`
  t.equal(vdom.create(tree).toString(), '<div></div>')
  t.end()
})

test('null value (empty)', function (t) {
  var tree = hx`<div>${null}</div>`
  t.equal(vdom.create(tree).toString(), '<div></div>')
  t.end()
})

test('string value (empty)', function (t) {
  var tree = hx`<div>${''}</div>`
  t.equal(vdom.create(tree).toString(), '<div></div>')
  t.end()
})

test('boolean value (empty)', function (t) {
  var tree = hx`<div>${false}</div>`
  t.equal(vdom.create(tree).toString(), '<div></div>')
  t.end()
})

test('boolean value', function (t) {
  var tree = hx`<div>${true}</div>`
  t.equal(vdom.create(tree).toString(), '<div>true</div>')
  t.end()
})

test('numeric value', function (t) {
  var tree = hx`<div>${555}</div>`
  t.equal(vdom.create(tree).toString(), '<div>555</div>')
  t.end()
})

test('numeric value (zero)', function (t) {
  var tree = hx`<div>${0}</div>`
  t.equal(vdom.create(tree).toString(), '<div>0</div>')
  t.end()
})
