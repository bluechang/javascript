/**
 * bind polyfill
 */

if (!Function.prototype.bind) {
  (function(){
    var slice = Array.prototype.slice

    Function.prototype.bind = function () {
      var preArgs = slice.call(arguments)
      var bindThis = preArgs.shift()
      var fn = this

      return function() {
        var appendArgs = slice.call(arguments)
        var args = preArgs.concat(appendArgs)
        return fn.apply(bindThis, args)
      }
    }
  })()
}