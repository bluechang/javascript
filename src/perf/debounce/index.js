/**
 * debounce
 * 场景：如百度/谷歌的搜索提示
 * 
 * @param {function} fn               实际执行的函数
 * @param {object}  options
 * @param {number}  options.wait      延迟执行的时间
 * @param {boolean} options.immediate 是否立即执行
 */
export function debounce(fn, options) {
  let timer
  options = Object.assign({}, options, debounce.options)

  return function(...args) {
    const context = this
    const { wait, immediate } = options

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
        timer = null
      }, wait)
    }
  }
}

debounce.options = {
  wait: 50,
  immediate: false
}

/**  简版
export function debounce(fn, wait = 50) {
  let timer = null
  
  return function() {
    const context = this
    
    if (timer) {
      clearTimeout(timer)
    }
    
    timer = serTimeout(() => {
      fn.apply(context, arguments)
      timer = null
    }, wait)
  }
}
*/
