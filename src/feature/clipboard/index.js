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

    const isSupported = document.execCommand('copy')
    if (!isSupported) {
      reject(new Error('该浏览器不支持复制到剪贴板'))
    }

    document.body.removeChild(el)
    resolve(text)
  })
}