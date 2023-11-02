import hyperx from '../index.js'
import test   from 'tape'
import vdom   from 'virtual-dom'


const hx = hyperx(vdom.h)

test('escape double quotes', function (t) {
  const value = '">'
  const tree = hx`<input type="text" value="${value}"></h1>`
  t.equal(
    vdom.create(tree).toString(),
  `<input type="text" value="&quot;&gt;" />`
  )
  t.end()
})

test('escape single quotes', function (t) {
  const value = "'>"
  const tree = hx`<input type='text' value='${value}'></h1>`
  t.equal(
    vdom.create(tree).toString(),
  `<input type="text" value="'&gt;" />`
  )
  t.end()
})
