/**
 * throttle
 * 
 * @param {function} fn 
 * @param {number} wait 
 * @param {boolean} immdiate
 */
export function throttle(fn, wait = 50, immdiate = false) {
  let timer

  return function(...args) {
    if (immdiate) {
      fn.apply(this, args)
      immdiate = false
    }

    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, wait)
    }
  }
}
