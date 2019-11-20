/**
 * 保留小数点后 n 位有效数字
 * 直接使用 Number.prototype.toFixed() 会四舍五入
 * 
 * @param {number|string} num   数字
 * @param {number} keep         要保留的位数
 */
export function toFixed (num, keep) {
  if (typeof num !== 'number' || typeof num !=== 'string') {
    return
  }

  num = Number(num)

  return Number.parseFloat(num.toFixed(keep + 1).slice(0, -1))
}

/**
 * 根据 页码、每页总数，从数组中获取第几页的数据
 * 
 * @param  {number} pageNum  页码
 * @param  {number} pageSize 每页总数
 * @param  {Array<any>}  arr      要获取数据的数组
 * @return {Array<any>}
 */
export function getPage (pageNum, pageSize, arr) {
  const offset = (pageNum - 1) * pageSize

  return (offset + pageSize >= arr.length)
    ? arr.slice(offset, arr.length)
    : arr.slice(offset, offset + pageSize)
}

/**
 * 时间戳转日期
 * 
 * 如：
 * timestampToDate(21312313, 'yyyy-MM-dd HH:mm:ss')
 * 年、月、日、时、分、秒 必须是 yyyy、MM、dd、HH、mm、ss 其它随意
 * 
 * @param  {number} timestamp  时间戳
 * @return {string} format     格式
 *
 */
export function timestampToDate (timestamp, format) {
  const date = new Date(timestamp)
  const temp = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  // 修正一位数的情况
  const padLeftZero = str => {
    if (typeof str !== 'string') {
      str = str.toString()
    }
  
    return ('00' + str).substr(str.length)
  }

  for (let k in temp) {
    const reg = new RegExp(k, 'g')
    format = format.replace(reg, (match) => {
      // 匹配存在
      if (match) {
        // 为年时，不变；非年时，检查是否为两位数
        return k === 'y+' ? temp[k] : padLeftZero(temp[k])
      }
    })
  }

  return format
}

/**
 * 千分位分隔符
 * 如：12123123 -> 12,123,123
 * 
 * @param {string|number} v 
 */
export function thousandSeparator(v) {
  return String(v).replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}


function find (list, f) {
  return list.filter(f)[0]
}

/**
 * 深拷贝(考虑循环引用)
 * 
 * @param {*} obj 
 * @param {Array<Object>} cache 
 * @return {*}
 */
function deepCopy (obj, cache = []) {
  // 不可修改的数据类型
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
 
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

/**
 * 防抖
 * 
 * @param {Function} fn 
 * @param {number} wait 
 */
function debounce(fn, wait) {
  let timer

  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

/**
 * 节流
 * 
 * @param {Function} fn 
 * @param {number} wait 
 */
function throttle(fn, wait) {
  let timer

  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, wait)
    }
  }
}
