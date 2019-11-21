/**
 * throttle
 * 时间戳会比定时器更准确
 * 
 * @param {function} fn   实际执行的函数
 * @param {number} wait   延迟执行的时间
 * 
 */
export function throttle(fn, wait = 50) {
  let prev = 0

  return function(...args) {
    const context = this
    let now = Date.now()

    if (now - prev >= wait) {
      fn.apply(context, args)
      prev = now
    }
  }
}
