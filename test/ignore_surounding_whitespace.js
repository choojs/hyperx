import hyperx from '../index.js'
import test   from 'tape'
import vdom   from 'virtual-dom'


const hx = hyperx(vdom.h)

test('ignore whitespace surrounding an element', function (t) {
  let tree = hx`<div></div>`;
  t.equal(vdom.create(tree).toString(), '<div></div>')
  tree = hx`
    <div></div>`;
  t.equal(vdom.create(tree).toString(), '<div></div>')
  tree = hx`
    <div></div>
  `;
  t.equal(vdom.create(tree).toString(), '<div></div>')
  // It shouldn't strip whitespace from a text node
  t.equal(hx`  hello world  `, '  hello world  ')
  t.end()
})
