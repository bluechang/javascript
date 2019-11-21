/**
 * throttle
 * 
 * @param {function} fn 
 * @param {number} wait 
 */
export function throttle(fn, wait = 50) {
  let timer

  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, wait)
    }
  }
}
