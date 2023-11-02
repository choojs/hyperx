import hyperx from '../index.js'
import test   from 'tape'
import vdom   from 'virtual-dom'


const hx = hyperx(vdom.h)

test('1 child', function (t) {
  const tree = hx`<div><span>foobar</span></div>`
  t.equal(vdom.create(tree).toString(), '<div><span>foobar</span></div>')
  t.end()
})

test('no children', function (t) {
  const tree = hx`<img href="xxx">`
  t.equal(vdom.create(tree).toString(), '<img href="xxx" />')
  t.end()
})

test('multiple children', function (t) {
  const html = `<div>
    <h1>title</h1>
    <div>
      <ul>
        <li>
          <a href="#">click</a>
        </li>
      </ul>
    </div>
  </div>`
  const tree = hx`
  <div>
    <h1>title</h1>
    <div>
      <ul>
        <li>
          <a href="#">click</a>
        </li>
      </ul>
    </div>
  </div>`
  t.equal(vdom.create(tree).toString(), html)
  t.end()
})
