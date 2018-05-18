# hyperx

tagged template string virtual dom builder

This module is similar to JSX, but provided as a standards-compliant ES6 tagged
template string function.

hyperx works with [virtual-dom](https://npmjs.com/package/virtual-dom),
[react](https://npmjs.com/package/react),
[hyperscript](https://npmjs.com/package/hyperscript), or any DOM builder with a
hyperscript-style API: `h(tagName, attrs, children)`.

You might also want to check out the [hyperxify][2] browserify transform to
statically compile hyperx into javascript expressions to save sending the hyperx
parser down the wire.

[2]: https://npmjs.com/package/hyperxify

# compatibility

[Template strings][1] are available in:
node 4+, chrome 41, firefox 34, edge, opera 28, safari 9

If you're targeting these platforms, there's no need to use a transpiler!

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings

# examples

## virtual-dom node example

``` js
const vdom = require('virtual-dom')
const hyperx = require('hyperx')
const hx = hyperx(vdom.h)

const title = 'world'
const wow = [1,2,3]
const tree = hx`<div>
  <h1 y="ab${1+2}cd">hello ${title}!</h1>
  ${hx`<i>cool</i>`}
  wow
  ${wow.map(w => hx`<b>${w}</b>\n`)}
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
const React = require('react')
const toString = require('react-dom/server').renderToString
const hyperx = require('hyperx')
const hx = hyperx(React.createElement)

const title = 'world'
const wow = [1,2,3]
const tree = hx`<div>
  <h1 y="ab${1+2}cd">hello ${title}!</h1>
  ${hx`<i>cool</i>`}
  wow
  ${wow.map(w => hx`<b>${w}</b>\n`)}
</div>`
console.log(toString(tree))
```

## hyperscript node example

``` js
const h = require('hyperscript')
const hyperx = require('hyperx')
const hx = hyperx(h)

const title = 'world'
const wow = [1,2,3]
const tree = hx`<div>
  <h1 data-y="ab${1+2}cd">hello ${title}!</h1>
  ${hx`<i>cool</i>`}
  wow
  ${wow.map(w => hx`<b>${w}</b>\n`)}
</div>`
console.log(tree.outerHTML)
```

## virtual-dom/main-loop browser example

``` js
const vdom = require('virtual-dom')
const hyperx = require('hyperx')
const hx = hyperx(vdom.h)

const main = require('main-loop')
const loop = main({ times: 0 }, render, vdom)
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
const React = require('react')
const render = require('react-dom').render
const hyperx = require('hyperx')
const hx = hyperx(React.createElement)

const App = React.createClass({
  getInitialState() { return { n: 0 } },
  render() {
    return hx`<div>
      <h1>clicked ${this.state.n} times</h1>
      <button onClick=${this.handleClick}>click me!</button>
    </div>`
  },
  handleClick() {
    this.setState({ n: this.state.n + 1 })
  }
})
render(React.createElement(App), document.querySelector('#content'))
```

## console.log example

``` js
const hyperx = require('hyperx')

const convertTaggedTemplateOutputToDomBuilder = hyperx(function (tagName, attrs, children) {
  console.log(tagName, attrs, children)
})

convertTaggedTemplateOutputToDomBuilder`<h1>hello world</h1>`

// Running this produces: h1 {} [ 'hello world' ]
```


# api

```
const hyperx = require('hyperx')
```

## const hx = hyperx(h, opts={})

Return a tagged template function `hx` from a hyperscript-style factory function
`h`.

Values to use for `h`:

* virtual-dom - `vdom.h`
* react - `React.createElement`
* hyperscript - hyperscript

Optionally provide:

* `opts.concat(a, b)` - custom concatenation function to combine quasiliteral
strings with expressions. The `h` factory function will receive the objects
returned by the concatenation function and can make specific use of them. This
is useful if you want to implement a pre-processor to generate javascript from
hyperx syntax.
* `opts.attrToProp` - turn off attribute to property conversions when `false`

# prior art

* http://www.2ality.com/2014/07/jsx-template-strings.html?m=1
* http://facebook.github.io/jsx/#why-not-template-literals (respectfully disagree)

# license

BSD

# install

```
npm install hyperx
```
