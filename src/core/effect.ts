import { Dispatch, Middleware, MiddlewareAPI } from 'redux'
import { EffectsMapObject } from './model'
import { CHILD_SIGN, prefix } from './utils'

export default function(effects: EffectsMapObject): Middleware {
  return ({ dispatch, getState }: MiddlewareAPI) => (
    next: Dispatch
  ) => async action => {
    try {
      const { type } = action
      const handler = effects[type]
      if (typeof handler !== 'function') {
        return next(action)
      }
      const [ns] = prefix(type).length > 1 ? prefix(type) : [undefined]
      await dispatch({
        type: `${ns}${CHILD_SIGN}${handler.name}${CHILD_SIGN}@@start`
      })
      const effect = await handler(action, {
        dispatch: _dispatch(ns),
        select: select()
      })
      await dispatch({
        type: `${ns}${CHILD_SIGN}${handler.name}${CHILD_SIGN}@@end`
      })
      return effect
    } catch (err) {
      throw err
    }

    function _dispatch(ns?: string) {
      if (!ns) {
        return dispatch
      }
      return action => {
        const { type } = action
        return dispatch({ ...action, type: prefixType(type, ns, effects) })
      }
    }

    function select() {
      const state = getState()
      return (cb: string & ((state: any) => void)) => {
        if (typeof cb === 'string' && state[cb]) {
          return state[cb]
        }
        return cb(state)
      }
    }

    function prefixType(type: string, ns: string, effects: EffectsMapObject) {
      const prefixType = `${ns}${CHILD_SIGN}${type}`
      const isSign = /\/@@[^/]+?$/.test(type)

      return isSign || effects[type] ? type : prefixType
    }
  }
}
