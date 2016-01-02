var TEXT = 0, OPEN = 1

module.exports = function (h) {
  var state = TEXT
  var tree = {}
  return function (strings) {
    var arglen = arguments.length
    var parts = []
    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        if (Array.isArray(arg)) arg = arg.join('')
        parts.push(strings[i], arg)
      } else parts.push(strings[i])
    }
    return parts.join('')
  }
  function parse (str) {
    for (var i = 0; i < str.length; i++) {
      if (state === TEXT && str.charAt(i) === '<') {
        state = OPEN
        continue
      }
    }
  }
}

var hasOwn = Object.prototype.hasOwnProperty
function has (obj, key) { return hasOwn.call(obj, key) }
