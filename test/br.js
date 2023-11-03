import hyperx from '../index.js'
import test   from 'tape'
import vdom   from 'virtual-dom'


const hx = hyperx(vdom.h)

test('self closing tags without a space', function (t) {
  const tree = hx`<div>a<br/>b<img src="boop"/></div>`
  t.equal(vdom.create(tree).toString(), '<div>a<br />b<img src="boop" /></div>')
  t.end()
})
