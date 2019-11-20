/**
 * 性能相关
 */

/**
 * 防抖
 * 
 * @param {Function} fn 
 * @param {number} wait 
 */
export function debounce(fn, wait) {
  let timer

  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

/**
 * 节流
 * 
 * @param {Function} fn 
 * @param {number} wait 
 */
export function throttle(fn, wait) {
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
