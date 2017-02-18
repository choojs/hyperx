var test = require('tape')
var hyperx = require('../')
var hx = hyperx(createElement)
var hxc = hyperx(createElement, {comments: true})

function createElement(tag, props, children) {
  if (tag === '!--') {
    return `<!--${props.comment}-->`
  }
  return `<${tag}>${children ? children.join('') : ''}</${tag}>`
}

test('1 comment', function (t) {
  var tree = hxc`<!-- test -->`
  t.equal(tree, '<!-- test -->')
  t.end()
})

test('with crazy characters', function (t) {
  var tree = hxc`<!-- .-_<>|[]{}"' -->`
  t.equal(tree, '<!-- .-_<>|[]{}"\' -->')
  t.end()
})

test('as child', function (t) {
  var tree = hxc`<div><!-- child --></div>`
  t.equal(tree, '<div><!-- child --></div>')
  t.end()
})

test('many comments', function (t) {
  var html = `<div>
    <!-- foo -->
    <span>bar</span>
    <!-- baz -->
  </div>`
  var tree = hxc`
  <div>
    <!-- foo -->
    <span>bar</span>
    <!-- baz -->
  </div>`
  t.equal(tree, html)
  t.end()
})

test('excluded by default', function (t) {
  var tree = hx`<div><!-- comment --></div>`
  t.equal(tree, '<div></div>')
  t.end()
})
