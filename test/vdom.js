import hyperx from '../index.js'
import test   from 'tape'
import vdom   from 'virtual-dom'


const hx = hyperx(vdom.h)

const expected = `<div>
    <h1 y="ab3cd">hello world!</h1>
    <i>cool</i>
    wow
    <b>1</b><b>2</b><b>3</b>
  </div>`

test('vdom', function (t) {
  const title = 'world'
  const wow = [1,2,3]
  const tree = hx`<div>
    <h1 y="ab${1+2}cd">hello ${title}!</h1>
    ${hx`<i>cool</i>`}
    wow
    ${wow.map(function (w, i) {
      return hx`<b>${w}</b>\n`
    })}
  </div>`
  t.equal(vdom.create(tree).toString(), expected)
  t.end()
})
