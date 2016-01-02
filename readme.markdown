# hyperx

tagged template string virtual dom builder

This module is similar to JSX, but provided as a standards-compliant ES6 tagged
template string function.

hyperx works with [virtual-dom](https://npmjs.com/package/virtual-dom),
[react](https://npmjs.com/package/react),
[hyperscript](https://npmjs.com/package/hyperscript), or any DOM builder with a
hyperscript-style API: `h(tagName, attrs, children)`.

# compatability

[Template strings][1] are available in:
node 4+, chrome 41, firefox 34, edge, opera 28, safari 9

If you're targeting these platforms, there's no need to use a transpiler!

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings

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

## react browser example

``` js
var React = require('react')
var render = require('react-dom').render
var hyperx = require('hyperx')
var hx = hyperx(React.createElement)

var App = React.createClass({
  getInitialState: function () { return { n: 0 } },
  render: function () {
    return hx`<div>
      <h1>clicked ${this.state.n} times</h1>
      <button onClick=${this.handleClick}>click me!</button>
    </div>`
  },
  handleClick: function () {
    this.setState({ n: this.state.n + 1 })
  }
})
render(React.createElement(App), document.querySelector('#content'))
```

# api

```
var hyperx = require('hyperx')
```

## var hx = hyperx(h)

Return a tagged template function `hx` from a hyperscript-style factory function
`h`.

Values to use for `h`:

* virtual-dom - `vdom.h`
* react - `React.createElement`
* hyperscript - hyperscript

# prior art

* http://www.2ality.com/2014/07/jsx-template-strings.html?m=1
* http://facebook.github.io/jsx/#why-not-template-literals (respectfully disagree)

# license

BSD

# install

```
npm install hyperx
```
