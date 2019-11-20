import {
  deepCopy,
} from '../index'

const obj = { 
  a: { 
    a1: 1 
  },
  b: [
    { b1: 1 }
  ],
  c: 1,
  d: null,
  e: undefined,
  f: NaN,
  e: true,
}
const arr = [
  1,
  '2',
  true,
  null,
  undefined,
  NaN,
  { 
    a: { 
      a1: 1 
    } 
  },
]

describe('func: object', () => {
  test('deepCopy', () => {
    const copiedObj = deepCopy(obj)
    const copiedArray = deepCopy(arr)
    expect(copiedObj).toEqual(obj)
    expect(copiedArray).toEqual(arr)
  })
})
