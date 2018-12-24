import { Dispatch, Middleware, MiddlewareAPI } from 'redux'
import { EffectsMapObject } from './model'
import { prefix } from './utils'

export default function(effects: EffectsMapObject): Middleware {
  return ({ dispatch }: MiddlewareAPI) => (next: Dispatch) => async action => {
    const { type } = action
    const handler = effects[type]
    if (typeof handler !== 'function') {
      return next(action)
    }
    const [ ns ] = prefix(type).length > 1 ? prefix(type) : [undefined]
    if (!ns) { return }
    await dispatch({ type: `${ns}/@@start`})
    const effect = await handler(action, _dispatch(ns))
    await dispatch({ type: `${ns}/@@end`})
    Promise.resolve(effect)

    function _dispatch(ns?: string) {
      if (!ns) {
        return dispatch
      }
      return action => {
        const { type } = action
        return dispatch({ ...action, type: `${ns}/${type}` })
      }
    }
  }

}
