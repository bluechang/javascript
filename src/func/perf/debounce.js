/**
 * debounce
 * 
 * @param {function} fn 
 * @param {number} wait 
 * @param {boolean} immediate 
 */
export function debounce(fn, wait = 50, immediate = false) {
  let timer

  return function(...args) {
    const context = this

    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      const callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) fn.apply(context, args)
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, wait)
    }
  }
}
