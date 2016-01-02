var test = require('tape')
var vdom = require('virtual-dom')
var hyperx = require('../')
var hx = hyperx(vdom.h)

test('key', function (t) {
  var key = 'type'
  var value = 'text'
  var tree = hx`<input ${key}=${value}>`
  t.equal(vdom.create(tree).toString(), '<input type="text" />')
  t.end()
})

test('pre key', function (t) {
  var key = 'ype'
  var value = 'text'
  var tree = hx`<input t${key}=${value}>`
  t.equal(vdom.create(tree).toString(), '<input type="text" />')
  t.end()
})

test('post key', function (t) {
  var key = 'typ'
  var value = 'text'
  var tree = hx`<input ${key}e=${value}>`
  t.equal(vdom.create(tree).toString(), '<input type="text" />')
  t.end()
})

test('pre post key', function (t) {
  var key = 'yp'
  var value = 'text'
  var tree = hx`<input t${key}e=${value}>`
  t.equal(vdom.create(tree).toString(), '<input type="text" />')
  t.end()
})
