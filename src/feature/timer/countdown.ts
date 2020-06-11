/**
 * countdown
 */
export default function makeCountdown(time: number) {
  let timer = null

  return function(
    fn: (curTime?: number) => void, 
    done?: () => void
  ): void {
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