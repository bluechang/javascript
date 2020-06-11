/**
 * 倒计时
 */
export default function makeCountdown() {
  let timer

  return function(time, fn, done) {
    if (timer) return

    let curTime = time
    fn(curTime)
    timer = setInterval(() => {
      if (curTime <= 0) {
        done && done()
        clearInterval(timer)
        timer = null
        return
      }
      fn(--curTime)
    }, 1000)
  }
}