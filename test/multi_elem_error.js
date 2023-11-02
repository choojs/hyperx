import hyperx from '../index.js'
import test   from 'tape'
import vdom   from 'virtual-dom'


const hx = hyperx(vdom.h)

test('multiple element error', function (t) {
  t.plan(1)
  t.throws(function () {
    const tree = hx`<div>one</div><div>two</div>`
  }, 'exception')
  t.end()
})
