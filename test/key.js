var test = require('tape')
var vdom = require('virtual-dom')
var hyperx = require('../')
var hx = hyperx(vdom.h)

test('bare key', function (t) {
  var key = 'type'
  var value = 'text'
  var tree = hx`<input ${key}=${value}>`
  t.equal(vdom.create(tree).toString(), '<input type="text" />')
  t.end()
})

test('quoted key', function (t) {
  var key = 'type'
  var value = 'text'
  var tree = hx`<input "${key}"=${value}>`
  t.equal(vdom.create(tree).toString(), '<input type="text" />')
  t.end()
})

test('pre bare key', function (t) {
  var key = 'ype'
  var value = 'text'
  var tree = hx`<input t${key}=${value}>`
  t.equal(vdom.create(tree).toString(), '<input type="text" />')
  t.end()
})

test('post bare key', function (t) {
  var key = 'typ'
  var value = 'text'
  var tree = hx`<input ${key}e=${value}>`
  t.equal(vdom.create(tree).toString(), '<input type="text" />')
  t.end()
})

test('pre post bare key', function (t) {
  var key = 'yp'
  var value = 'text'
  var tree = hx`<input t${key}e=${value}>`
  t.equal(vdom.create(tree).toString(), '<input type="text" />')
  t.end()
})

test('quoted pre post bare key', function (t) {
  var key = 'yp'
  var value = 'text'
  var tree = hx`<input "t${key}e"=${value}>`
  t.equal(vdom.create(tree).toString(), '<input type="text" />')
  t.end()
})
