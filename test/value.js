import hyperx from '../index.js'
import test   from 'tape'
import vdom   from 'virtual-dom'


const hx = hyperx(vdom.h)

test('value', function (t) {
  const key = 'type'
  const value = 'text'
  const tree = hx`<input ${key}=${value}>`
  t.equal(vdom.create(tree).toString(), '<input type="text" />')
  t.end()
})

test('pre value', function (t) {
  const key = 'type'
  const value = 'ext'
  const tree = hx`<input ${key}=t${value}>`
  t.equal(vdom.create(tree).toString(), '<input type="text" />')
  t.end()
})

test('post key', function (t) {
  const key = 'type'
  const value = 'tex'
  const tree = hx`<input ${key}=${value}t>`
  t.equal(vdom.create(tree).toString(), '<input type="text" />')
  t.end()
})

test('pre post key', function (t) {
  const key = 'type'
  const value = 'ex'
  const tree = hx`<input ${key}=t${value}t>`
  t.equal(vdom.create(tree).toString(), '<input type="text" />')
  t.end()
})
