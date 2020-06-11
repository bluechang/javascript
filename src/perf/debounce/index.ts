/**
 * debounce
 * 场景：如百度/谷歌 的搜索提示
 * 
 */
interface Options {
  wait: number,
  immediate: boolean
}

export function debounce(
  fn: Function, 
  options?: Options
) {
  let timer = null
  options = Object.assign({}, options || {}, debounce.options)

  return function(...args: any[]) {
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

/** a simple version
export function debounce(
  fn: () => void, 
  wait: number = 50
) {
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
