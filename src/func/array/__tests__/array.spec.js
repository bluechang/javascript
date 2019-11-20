import {
  getPage,
} from '../index'

const pageArr = [
  { a: 1 },
  { b: 1 },
  { c: 1 },
  { d: 1 },
  { e: 1 },
]

describe('func: array', () => {
  test('getPage', () => {
    const page1 = getPage(1, 2, pageArr)
    const page3 = getPage(3, 2, pageArr)
    
    expect(page1).toEqual([{ a: 1 }, { b: 1 }])
    expect(page3).toEqual([{ e: 1 }])
  })
})
