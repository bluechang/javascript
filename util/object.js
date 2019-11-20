/**
 * 对象相关
 */

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
export function deepCopy (obj, cache = []) {
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
