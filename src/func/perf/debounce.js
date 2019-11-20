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
    if (immediate) {
      fn.apply(this, args)
      immediate = false
    }
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}
