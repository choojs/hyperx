import hyperx from '../index.js'
import test   from 'tape'
import vdom   from 'virtual-dom'


var hx = hyperx(vdom.h)

test('title html tag', function (t) {
  var tree = hx`<title>hello</title>`
  t.equal(vdom.create(tree).toString(), '<title>hello</title>')
  t.end()
})
