/**
 * throttle
 * 
 * 场景：如验证码、拖拽
 * 
 * @param {function} fn   实际执行的函数
 * @param {number} wait   延迟执行的时间
 * 
 */

// 时间版：时间戳会比定时器更准确
export function throttle(fn, wait = 50) {
  let prev = 0

  return function() {
    const context = this
    let now = Date.now()

    if (now - prev >= wait) {
      fn.apply(context, arguments)
      prev = now
    }
  }
}

// 定时器版
// export function throttle(fn, wait = 50) {
//   let timer = null
  
//   return function() {
//     const context = this
    
//     if (timer) return
  
//     timer = setTimeout(() => {
//       fn.apply(context, arguments)
//       timer = null
//     }, wait)
//   }
// }
