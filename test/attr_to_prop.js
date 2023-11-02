import hyperx from '../index.js'
import test   from 'tape'
import vdom   from 'virtual-dom'


const hx = hyperx(vdom.h)

test('class to className', function (t) {
  const tree = hx`<div class="wow"></div>`
  t.deepEqual(tree.properties, { className: 'wow' })
  t.end()
})

test('for to htmlFor', function (t) {
  const tree = hx`<div for="wow"></div>`
  t.deepEqual(tree.properties, { htmlFor: 'wow' })
  t.end()
})

test('http-equiv to httpEquiv', function (t) {
  const tree = hx`<meta http-equiv="refresh" content="30">`
  t.deepEqual(tree.properties, { content: '30', httpEquiv: 'refresh' })
  t.end()
})

test('no transform', t => {
  const hx = hyperx(vdom.h, { attrToProp: false })
  const tree = hx`<div class="wow"></div>`
  t.deepEqual(tree.properties, { class: 'wow' })
  t.end()
})
