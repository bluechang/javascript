function createElm (type) {
  let el = document.createElement('textarea')

  el.style.position = 'fixed'
  el.style.visibility = 'visible'
  // 移动端会闪现键盘
  el.setAttribute('readonly', 'readonly')

  return el
}

export default function copyToClipboard (text) {
  return new Promise((resolve, reject) => {
    const el = createElm('textarea')

    el.value = text
    document.body.appendChild(el)
    el.select()

    try {
      const isSupported = document.execCommand('copy')
      if (!isSupported) {
        return alert('该浏览器不支持复制到剪贴板')
      }
      resolve()
    } catch (e) {
      reject(e)
    }

    document.body.removeChild(el)
  })
}