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
