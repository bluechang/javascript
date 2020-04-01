/**
 * debounce
 * 场景：如百度/谷歌的搜索提示
 * 
 * @param {function} fn 实际执行的函数
 * @param {number} wait 延迟执行的时间
 * @param {boolean} immediate 是否立即执行
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
        timer = null
      }, wait)
    }
  }
}

// 简版
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
