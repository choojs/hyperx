import hyperx from '../index.js'
import test   from 'tape'
import vdom   from 'virtual-dom'


const hx = hyperx(vdom.h)

test('key', function (t) {
  const key = 'type'
  const value = 'text'
  const tree = hx`<input ${key}=${value}>`
  t.equal(vdom.create(tree).toString(), '<input type="text" />')
  t.end()
})

test('pre key', function (t) {
  const key = 'ype'
  const value = 'text'
  const tree = hx`<input t${key}=${value}>`
  t.equal(vdom.create(tree).toString(), '<input type="text" />')
  t.end()
})

test('post key', function (t) {
  const key = 'typ'
  const value = 'text'
  const tree = hx`<input ${key}e=${value}>`
  t.equal(vdom.create(tree).toString(), '<input type="text" />')
  t.end()
})

test('pre post key', function (t) {
  const key = 'yp'
  const value = 'text'
  const tree = hx`<input t${key}e=${value}>`
  t.equal(vdom.create(tree).toString(), '<input type="text" />')
  t.end()
})

test('boolean key', function (t) {
  const key = 'checked'
  const tree = hx`<input type="checkbox" ${key}>`
  t.equal(vdom.create(tree).toString(),
    '<input type="checkbox" checked="checked" />')
  t.end()
})

test('multiple keys', function (t) {
  const props = {
    type: 'text',
    'data-special': 'true'
  }
  const key = 'data-'
  const value = 'bar'
  const tree = hx`<input ${props} ${key}foo=${value}>`
  t.equal(vdom.create(tree).toString(), '<input type="text" data-special="true" data-foo="bar" />')
  t.end()
})

test('multiple keys dont overwrite existing ones', function (t) {
  const props = {
    type: 'text'
  }
  const tree = hx`<input type="date" ${props}>`
  t.equal(vdom.create(tree).toString(), '<input type="date" />')
  t.end()
})

// https://github.com/choojs/hyperx/issues/55
test('unquoted key does not make void element eat adjacent elements', function (t) {
  const tree = hx`<span><input type=text>sometext</span>`
  t.equal(vdom.create(tree).toString(), '<span><input type="text" />sometext</span>')
  t.end()
})
