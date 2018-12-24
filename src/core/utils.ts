const isObject = require('is-plain-object')
export { isObject }
export const noop = () => {}
export const assert = (condition, msg) => {
  if (!condition) { throw new Error(`${msg}`) }
}
type TReduceArr = <T>(arr: T[]) => (f: (...p: any) => any) => T[]
export const reduceArr: TReduceArr = arr => fn =>
  arr.reduce((p, c) => p.concat(fn(c)), [])

type TReduceObj = <T>(obj: T) => (f: (...p: any) => any) => any
export const reduceObj: TReduceObj = obj => fn =>
  Object.keys(obj).reduce(fn, {})

export function prefix(type: string) {
  const [ ns, act ] = type.split('/')
  return [ ns, act ]
}
