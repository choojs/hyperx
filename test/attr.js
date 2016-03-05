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
  var tree = hx`<video autoplay></video>`
  t.equal(vdom.create(tree).toString(), '<video autoplay="autoplay"></video>')
  t.end()
})

test('boolean attribute followed by normal attribute', function (t) {
  var tree = hx`<video autoplay volume="50"></video>`
  t.equal(vdom.create(tree).toString(), '<video autoplay="autoplay" volume="50"></video>')
  t.end()
})

test('boolean attribute preceded by normal attribute', function (t) {
  var tree = hx`<video volume="50" autoplay></video>`
  t.equal(vdom.create(tree).toString(), '<video volume="50" autoplay="autoplay"></video>')
  t.end()
})
