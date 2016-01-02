var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4
var ATTR_KEY = 5, ATTR_KEY_W = 6
var ATTR_VALUE_W = 7, ATTR_VALUE = 8
var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10
var ATTR_VALUE_SQ_E = 11, ATTR_VALUE_DQ_E = 12

module.exports = function (h) {
  var state = TEXT, reg = ''
  var tree = {}
  return function (strings) {
    var arglen = arguments.length
    var parts = []
    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        parts.push(p, [ VAR, state, arg ])
      } else parts.push(parse(strings[i]))
    }
    return parts
  }
  function parse (str) {
    var res = []
    for (var i = 0; i < str.length; i++) {
      var c = str.charAt(i)
      if (state === TEXT && c === '<') {
        if (reg.length) res.push([TEXT, reg])
        reg = ''
        state = OPEN
      } else if (c === '>' && !quot(state)) {
        if (state === OPEN) {
          res.push([OPEN,reg])
        } else if (state === ATTR_KEY) {
          res.push([ATTR_KEY,reg])
        } else if (state === ATTR_VALUE && reg.length) {
          res.push([ATTR_VALUE,reg])
        }
        res.push([CLOSE])
        reg = ''
        state = TEXT
      } else if (state === TEXT) {
        reg += c
      } else if (state === OPEN && /\s/.test(c)) {
        res.push([OPEN, reg])
        reg = ''
        state = ATTR
      } else if (state === OPEN) {
        reg += c
      } else if (state === ATTR && /[\w-]/.test(c)) {
        state = ATTR_KEY
        reg = c
      } else if (state === ATTR_KEY && /\s/.test(c)) {
        res.push([ATTR_KEY,reg])
        reg = ''
        state = ATTR_KEY_W
      } else if (state === ATTR_KEY && c === '=') {
        res.push([ATTR_KEY,reg])
        reg = ''
        state = ATTR_VALUE_W
      } else if (state === ATTR_KEY_W && c === '=') {
        state = ATTR_VALUE_W
      } else if (state === ATTR_KEY_W && !/\s/.test(c)) {
        state = ATTR
        i--
      } else if (state === ATTR_VALUE_W && c === '"') {
        state = ATTR_VALUE_DQ
      } else if (state === ATTR_VALUE_W && c === "'") {
        state = ATTR_VALUE_SQ
      } else if (state === ATTR_VALUE_DQ && c === '"') {
        res.push([ATTR_VALUE_DQ,reg])
        reg = ''
        state = ATTR
      } else if (state === ATTR_VALUE_SQ && c === '"') {
        res.push([ATTR_VALUE_SQ,reg])
        reg = ''
        state = ATTR
      } else if (state === ATTR_VALUE_DQ && c === '\\') {
        state = ATTR_VALUE_DQ_E
        reg += c
      } else if (state === ATTR_VALUE_SQ && c === '\\') {
        state = ATTR_VALUE_SQ_E
        reg += c
      } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
        state = ATTR_VALUE
        i--
      } else if (state === ATTR_VALUE && /\s/.test(c)) {
        res.push([ATTR_VALUE,reg])
        state = ATTR
      } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
      || state === ATTR_VALUE_DQ) {
        reg += c
      }
    }
    return res
  }
}

function quot (state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
    || state === ATTR_VALUE_SQ_E || state === ATTR_VALUE_DQ_E
}
