import hyperx from '../index.js'
import test   from 'tape'
import vdom   from 'virtual-dom'


const hx = hyperx(vdom.h)

test('tag as string variable', function (t) {
  const tag = 'div'
  const tree = hx`<${tag} class="wow"></${tag}>`
  t.equal(vdom.create(tree).toString(), '<div class="wow"></div>')
  t.end()
})

test('tag as function variable', function (t) {
  const customTag = function () {}
  const h = function (tag, attrs, children) {
    t.equal(tag, customTag)
    t.deepEqual(attrs, { className: 'wow' })
    t.deepEqual(children, [ 'child' ])
    t.end()
  }
  const hx = hyperx(h)
  const tree = hx`<${customTag} class="wow">child</${customTag}>`
})
