function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure
 * 
 * @param {*} obj 
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepClone (obj, cache = []) {
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

export function deepClone2 (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    const res = {}
    for (const key in value) {
      res[key] = clone(value[key])
    }
    return res
  } else {
    return value
  }
}
