/**
 * throttle
 * 
 * 场景：如验证码、拖拽
 */

// a timestamp version
// The timestamp is accurate than timer
export function throttle(
  fn: Function,
  wait: number = 50
) {
  let prev: number = 0

  return function() {
    const context = this
    let now: number = Date.now()

    if (now - prev >= wait) {
      fn.apply(context, arguments)
      prev = now
    }
  }
}

/** a timer version
export function throttle(
  fn: () => void, 
  wait: number = 50
) {
  let timer = null
  
  return function() {
    const context = this
    
    if (timer) return
  
    timer = setTimeout(() => {
      fn.apply(context, arguments)
      timer = null
    }, wait)
  }
}
*/
