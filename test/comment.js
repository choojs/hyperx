import hyperx from '../index.js'
import test   from 'tape'


const hx = hyperx(createElement)
const hxc = hyperx(createElement, {comments: true})

function createElement(tag, props, children) {
  if (tag === '!--') {
    return `<!--${props.comment}-->`
  }
  return `<${tag}>${children ? children.join('') : ''}</${tag}>`
}

test('1 comment', function (t) {
  const tree = hxc`<!-- test -->`
  t.equal(tree, '<!-- test -->')
  t.end()
})

test('with crazy characters', function (t) {
  const tree = hxc`<!-- .-_<>|[]{}"' -->`
  t.equal(tree, '<!-- .-_<>|[]{}"\' -->')
  t.end()
})

test('as child', function (t) {
  const tree = hxc`<div><!-- child --></div>`
  t.equal(tree, '<div><!-- child --></div>')
  t.end()
})

test('many comments', function (t) {
  const html = `<div>
    <!-- foo -->
    <span>bar</span>
    <!-- baz -->
  </div>`
  const tree = hxc`
  <div>
    <!-- foo -->
    <span>bar</span>
    <!-- baz -->
  </div>`
  t.equal(tree, html)
  t.end()
})

test('excluded by default', function (t) {
  const tree = hx`<div><!-- comment --></div>`
  t.equal(tree, '<div></div>')
  t.end()
})

test('template parts in comment, discard comments', function (t) {
  const child = 'something'
  const objectChild = {
    type: 'div',
    children: ['something']
  }
  let tree = hx`<div><!-- abc ${child} def --></div>`
  t.equal(tree, '<div></div>')
  tree = hx`<div><!-- abc ${objectChild} def --></div>`
  t.equal(tree, '<div></div>')
  t.end()
})

test('template parts in comment, keep comments', function (t) {
  const child = 'something'
  const objectChild = {
    type: 'div',
    children: ['something']
  }
  let tree = hxc`<div><!-- abc ${child} def --></div>`
  t.equal(tree, '<div><!-- abc something def --></div>')
  tree = hxc`<div><!-- abc ${objectChild} def --></div>`
  t.equal(tree, '<div><!-- abc [object Object] def --></div>', 'stringifies comment contents')
  t.end()
})
