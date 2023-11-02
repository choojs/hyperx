import hyperx from '../index.js'
import test   from 'tape'
import vdom   from 'virtual-dom'


const hx = hyperx(vdom.h)

test('undefined value (empty)', function (t) {
  const tree = hx`<div>${undefined}</div>`
  t.equal(vdom.create(tree).toString(), '<div></div>')
  t.end()
})

test('null value (empty)', function (t) {
  const tree = hx`<div>${null}</div>`
  t.equal(vdom.create(tree).toString(), '<div></div>')
  t.end()
})

test('boolean value', function (t) {
  const tree = hx`<div>${false}</div>`
  t.equal(vdom.create(tree).toString(), '<div>false</div>')
  t.end()
})

test('numeric value', function (t) {
  const tree = hx`<div>${555}</div>`
  t.equal(vdom.create(tree).toString(), '<div>555</div>')
  t.end()
})
