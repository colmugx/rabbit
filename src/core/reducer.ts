import { Action, ReducersMapObject } from 'redux'
import { EffectsMapObject, Model } from './model'
import { CHILD_SIGN, reduceObj } from './utils'

export function mergeReducer(model: Model, type: 'reducers' | 'effects') {
  const name = model.name
  const _reducers = model[type]
  const _state = model.state || {}

  if (_reducers) {
    const reducers = reduceObj(_reducers as
      | ReducersMapObject
      | EffectsMapObject)((prev, key) => {
      const reducer = _reducers[key]
      const type = getActionType(name, key)

      return {
        ...prev,
        [type]: reducer
      }
    })

    return type === 'effects' ? reducers : createReducer(_state, reducers)
  }

  return {}

  function getActionType(name: string, type: string): string {
    return `${name}${CHILD_SIGN}${type}`
  }
}

function createReducer(initState: any, handlers = {}) {
  return (state = initState, action: Action) => {
    const { type } = action
    if (type in handlers) {
      const handler = handlers[type]
      if (typeof handler !== 'function') {
        return
      }

      return handler(state, action)
    }

    return state
  }
}
