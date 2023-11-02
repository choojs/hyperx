import hyperx from '../index.js'
import test   from 'tape'
import vdom   from 'virtual-dom'


const hx = hyperx(vdom.h)

test('title html tag', function (t) {
  const tree = hx`<title>hello</title>`
  t.equal(vdom.create(tree).toString(), '<title>hello</title>')
  t.end()
})
