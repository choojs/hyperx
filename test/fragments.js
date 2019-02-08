var test = require('tape')
var vdom = require('virtual-dom')
var hyperx = require('../')
var hx = hyperx(vdom.h, {createFragment: createFragment})

function createFragment (nodes) {
  return { frag: nodes }
}

test('mutliple root, fragments as array', function (t) {
  var list = hx`<li>1</li>  <li>2<div>_</div></li>`
  t.ok(Array.isArray(list.frag))
  t.equal(list.frag.length, 3, '3 elements')
  t.equal(vdom.create(list.frag[0]).toString(), '<li>1</li>')
  t.equal(list.frag[1], '  ')
  t.equal(vdom.create(list.frag[2]).toString(), '<li>2<div>_</div></li>')
  t.end()
})

test('mutliple root embeds, fragments as array', function (t) {
  var list = hx`${[1,2]}`
  t.ok(Array.isArray(list.frag))
  t.deepEqual(list, {
    frag: [1, 2]
  })
  t.end()
})
