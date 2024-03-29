var attrToProp = require('hyperscript-attribute-to-property')


var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4
var ATTR_KEY = 5, ATTR_KEY_W = 6
var ATTR_VALUE_W = 7, ATTR_VALUE = 8
var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10
var ATTR_EQ = 11, ATTR_BREAK = 12
var COMMENT = 13


module.exports = function (h, opts) {
  if (!opts) opts =  { }

  var concat = opts.concat || function (a, b) {
    return String(a) + String(b)
  }

  if (opts.attrToProp !== false)
    h = attrToProp(h)


  return function (strings) {

    var state = TEXT, reg = '', isSelfClosing = false
    var arglen = arguments.length
    var parts = []

    for (var i = 0; i < strings.length; i++) {

      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        var xstate = state
        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE
        if (xstate === ATTR) xstate = ATTR_KEY
        if (xstate === OPEN) {
          if (reg === '/') {
            p.push([ OPEN, '/', arg ])
            reg = ''
          } else {
            p.push([ OPEN, arg ])
          }
        } else if (xstate === COMMENT && opts.comments) {
          reg += String(arg)
        } else if (xstate !== COMMENT) {
          p.push([ VAR, xstate, arg ])
        }
        parts.push.apply(parts, p)
      } else {
        parts.push.apply(parts, parse(strings[i]))
      }
    }

    var tree = [ null, {}, [] ]
    var stack = [ [ tree, -1 ] ]

    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length-1][0]
      var p = parts[i], state = p[0]

      if (state === OPEN && /^\//.test(p[1])) {
        var ix = stack[stack.length-1][1]
        if (stack.length > 1) {
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(cur[0], cur[1], cur[2].length ? cur[2] : undefined)
        }

      } else if (state === OPEN) {
        var c = [p[1],{},[]]
        cur[2].push(c)
        stack.push([c,cur[2].length-1])

      } else if (state === ATTR_KEY || (state === VAR && p[1] === ATTR_KEY)) {
        var key = ''
        var copyKey
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_KEY) {
            key = concat(key, parts[i][1])

          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
            if (typeof parts[i][2] === 'object' && !key) {
              for (copyKey in parts[i][2])
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey])
                  cur[1][copyKey] = parts[i][2][copyKey]

            } else {
              key = concat(key, parts[i][2])
            }

          } else {
            break
          }
        }

        if (parts[i][0] === ATTR_EQ)
          i++

        var j = i

        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
            if (!cur[1][key])
                cur[1][key] = strfn(parts[i][1])
            else
                parts[i][1]==="" || (cur[1][key] = concat(cur[1][key], parts[i][1]));

          } else if (parts[i][0] === VAR && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
            if (!cur[1][key])
                cur[1][key] = strfn(parts[i][2])
            else
                parts[i][2]==="" || (cur[1][key] = concat(cur[1][key], parts[i][2]));

          } else {
            if (key.length && !cur[1][key] && i === j && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase()
            }

            if (parts[i][0] === CLOSE)
              i--

            break
          }
        }

      } else if (state === ATTR_KEY) {
        cur[1][p[1]] = true

      } else if (state === VAR && p[1] === ATTR_KEY) {
        cur[1][p[2]] = true

      } else if (state === CLOSE) {
        
        const isSelfClosing = p[1] || selfClosingVoid(cur[0])
        //if (selfClosing(cur[0]) && stack.length) {
        if (isSelfClosing && stack.length) {
          var ix = stack[stack.length-1][1]
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(cur[0], cur[1], cur[2].length ? cur[2] : undefined)
        }

      } else if (state === VAR && p[1] === TEXT) {
        if (p[2] === undefined || p[2] === null)
            p[2] = ''
        else if (!p[2])
            p[2] = concat('', p[2])

        if (Array.isArray(p[2][0]))
          cur[2].push.apply(cur[2], p[2])
        else
          cur[2].push(p[2])

      } else if (state === TEXT) {
        cur[2].push(p[1])

      } else if (state === ATTR_EQ || state === ATTR_BREAK) {
        // no-op

      } else {
        throw new Error('unhandled: ' + state)

      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0]))
      tree[2].shift()

    if (tree[2].length > 2 || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
      if (opts.createFragment)
        return opts.createFragment(tree[2])
      
      throw new Error(
        'multiple root elements must be wrapped in an enclosing tag'
      )
    }

    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string' && Array.isArray(tree[2][0][2]))
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])

    return tree[2][0]

    function parse (str) {
      var res = [ ]

      var isInStyleTag = false

      if (state === ATTR_VALUE_W)
        state = ATTR

      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i)
        if (state === TEXT && c === '<') {
          if (reg.length)
            res.push([TEXT, reg])
          reg = ''
          state = OPEN
          isInStyleTag = false

        } else if (c === '>' && !quot(state) && state !== COMMENT) {

          if (state === OPEN && reg.length) {
            res.push([OPEN,reg])

            if (reg === 'style')
              isInStyleTag = true
            else if (reg === '/style')
              isInStyleTag = false

          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY,reg])
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE,reg])
          }

          if (state === TEXT && isInStyleTag) {
            // the css descendant selector within <style> tags shouldn't close
            // e.g., <style> ul > .test { color: blue }</style>
            reg += c
          } else {
            res.push([CLOSE, isSelfClosing])
            isSelfClosing = false
            reg = ''
          }
          
          state = TEXT

        } else if (state === COMMENT && /-$/.test(reg) && c === '-') {
          if (opts.comments) {
            res.push([ATTR_VALUE,reg.substr(0, reg.length - 1)])
          }
          reg = ''
          isSelfClosing = true
          state = TEXT
        } else if (state === OPEN && /^!--$/.test(reg)) {
          if (opts.comments) {
            res.push([OPEN, reg],[ATTR_KEY,'comment'],[ATTR_EQ])
          }
          reg = c
          state = COMMENT
        } else if (state === TEXT || state === COMMENT) {
          reg += c
        } else if (state === OPEN && c === '/' && reg.length) {
          // self closing tag without a space <br/>
          isSelfClosing = true

        } else if (state === OPEN && /\s/.test(c)) {
          if (reg.length)
            res.push([OPEN, reg])

          if (reg === 'style')
            isInStyleTag = true
          else if (reg === '/style')
            isInStyleTag = false

          reg = ''
          state = ATTR
        } else if (state === OPEN) {
          reg += c
        } else if (state === ATTR && /[^\s"'=/]/.test(c)) {
          state = ATTR_KEY
          reg = c
        } else if (state === ATTR && /\s/.test(c)) {
          if (reg.length)
            res.push([ATTR_KEY,reg])
          res.push([ATTR_BREAK])
        } else if (state === ATTR_KEY && /\s/.test(c)) {
          res.push([ATTR_KEY,reg])
          reg = ''
          state = ATTR_KEY_W
        } else if (state === ATTR_KEY && c === '=') {
          res.push([ATTR_KEY,reg],[ATTR_EQ])
          reg = ''
          state = ATTR_VALUE_W
        } else if (state === ATTR_KEY && c === '/') {
          isSelfClosing = true
          reg=''
          state = ATTR
        } else if (state === ATTR_KEY) {
          reg += c
        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
          res.push([ATTR_EQ])
          state = ATTR_VALUE_W
        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
          res.push([ATTR_BREAK])
          if (/[\w-]/.test(c)) {
            reg += c
            state = ATTR_KEY
          } else if (c === '/') {
            isSelfClosing = true
          } else {
            state = ATTR
          }
        } else if (state === ATTR_VALUE_W && c === '"') {
          state = ATTR_VALUE_DQ
        } else if (state === ATTR_VALUE_W && c === "'") {
          state = ATTR_VALUE_SQ
        } else if (state === ATTR_VALUE_DQ && c === '"') {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_SQ && c === "'") {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
          state = ATTR_VALUE
          i--
        } else if (state === ATTR_VALUE && /\s/.test(c)) {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
        || state === ATTR_VALUE_DQ) {
          reg += c
        }
      }
      if (state === TEXT && reg.length) {
        res.push([TEXT,reg])
        reg = ''
      } else if (state === ATTR_VALUE && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_DQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_SQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_KEY) {
        res.push([ATTR_KEY,reg])
        reg = ''
      }
      return res
    }
  }

  function strfn (x) {
    if (typeof x === 'function') return x
    else if (typeof x === 'string') return x
    else if (x && typeof x === 'object') return x
    else if (x === null || x === undefined) return x
    else return concat('', x)
  }
}

function quot (state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
}

//area, base, br, col, command, embed, hr, img, input, keygen, link, meta, param, source, track, wbr
var voidCloseRE = RegExp('^(' + [
  'area', 'base', 'br', 'col', 'command', 'embed',
  'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')

function selfClosingVoid (tag) { return voidCloseRE.test(tag) }

/*
var closeRE = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr', '!--',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')

function selfClosing (tag) { return closeRE.test(tag) }
*/
