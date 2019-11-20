/**
 * 日期相关
 */

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
