import hyperx from '../index.js'
import test   from 'tape'
import vdom   from 'virtual-dom'


const hx = hyperx(vdom.h)

test('style', function (t) {
  const key = 'type'
  const value = 'text'
  const tree = hx`<input style=${
    {color:'purple','font-size':16}
  } type="text">`
  t.equal(
    vdom.create(tree).toString(),
    '<input style="color:purple;font-size:16;" type="text" />'
  )
  t.end()
})


test('embedded style', function (t) {
  const key = 'type'
  const value = 'text'
  const tree = hx`<style>
       .test > ul {
          background-color: red;
       }
   </style>`
  t.equal(
    vdom.create(tree).toString(),
    `<style>
       .test &gt; ul {
          background-color: red;
       }
   </style>`
  )
  t.end()
})

test('embedded style with attributes', function (t) {
  const key = 'type'
  const value = 'text'
  const tree = hx`<style id="test1">
       .test > ul {
          background-color: red;
       }
   </style>`
  t.equal(
    vdom.create(tree).toString(),
    `<style id="test1">
       .test &gt; ul {
          background-color: red;
       }
   </style>`
  )
  t.end()
})
