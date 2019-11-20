/**
 * 基础类型相关
 */

/**
 * 千分位分隔符
 * 如：12123123 -> 12,123,123
 * 
 * @param {string|number} v 
 */
export function thousandSeparator (v) {
  return String(v).replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}

/**
 * 保留小数点后 n 位有效数字
 * 直接使用 Number.prototype.toFixed() 会四舍五入
 * 
 * @param {number|string} num   数字
 * @param {number} keep         要保留的位数
 */
export function toFixed (num, keep) {
  if (typeof num !== 'number' || typeof num !== 'string') {
    return
  }

  num = Number(num)

  return Number.parseFloat(num.toFixed(keep + 1).slice(0, -1))
}
