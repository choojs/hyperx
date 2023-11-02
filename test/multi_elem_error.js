import hyperx from '../index.js'
import test   from 'tape'
import vdom   from 'virtual-dom'


var hx = hyperx(vdom.h)

test('multiple element error', function (t) {
  t.plan(1)
  t.throws(function () {
    var tree = hx`<div>one</div><div>two</div>`
  }, 'exception')
  t.end()
})
