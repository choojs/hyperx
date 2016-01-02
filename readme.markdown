# hyperx

tagged template string virtual dom builder

This module is similar to JSX, but provided as a standards-compliant ES6 tagged
template string function.

hyperx works with [virtual-dom](https://npmjs.com/package/virtual-dom),
[react](https://npmjs.com/package/react),
[hyperscript](https://npmjs.com/package/hyperscript), or any DOM builder with a
hyperscript-style API: `h(tagName, attrs, children)`.

# compatability

Template strings are available in:
node 4+, chrome 41, firefox 34, edge, opera 28, safari 9

If you're targeting these platforms, there's no need to use a transpiler!

# examples

## virtual-dom node example

``` js
var vdom = require('virtual-dom')
var hyperx = require('hyperx')
var hx = hyperx(vdom.h)

var title = 'world'
var wow = [1,2,3]
var tree = hx`<div>
  <h1 y="ab${1+2}cd">hello ${title}!</h1>
  ${hx`<i>cool</i>`}
  wow
  ${wow.map(function (w, i) {
    return hx`<b>${w}</b>\n`
  })}
</div>`
console.log(vdom.create(tree).toString())
```

output:

```
$ node vdom.js
<div>
  <h1 y="ab3cd">hello world!</h1>
  <i>cool</i>
  wow
  <b>1</b><b>2</b><b>3</b>
</div>
```

## react node example

``` js
var React = require('react')
var toString = require('react-dom/server').renderToString
var hyperx = require('hyperx')
var hx = hyperx(React.createElement)

var title = 'world'
var wow = [1,2,3]
var tree = hx`<div>
  <h1 y="ab${1+2}cd">hello ${title}!</h1>
  ${hx`<i>cool</i>`}
  wow
  ${wow.map(function (w, i) {
    return hx`<b>${w}</b>\n`
  })}
</div>`
console.log(toString(tree))
```

## hyperscript node example

``` js
var h = require('hyperscript')
var hyperx = require('hyperx')
var hx = hyperx(h)

var title = 'world'
var wow = [1,2,3]
var tree = hx`<div>
  <h1 y="ab${1+2}cd">hello ${title}!</h1>
  ${hx`<i>cool</i>`}
  wow
  ${wow.map(function (w) {
    return hx`<b>${w}</b>\n`
  })}
</div>`
console.log(tree.outerHTML)
```

## virtual-dom/main-loop browser example

``` js
var vdom = require('virtual-dom')
var hyperx = require('hyperx')
var hx = hyperx(vdom.h)

var main = require('main-loop')
var loop = main({ times: 0 }, render, vdom)
document.querySelector('#content').appendChild(loop.target)

function render (state) {
  return hx`<div>
    <h1>clicked ${state.times} times</h1>
    <button onclick=${onclick}>click me!</button>
  </div>`

  function onclick () {
    loop.update({ times: state.times + 1 })
  }
}
```


