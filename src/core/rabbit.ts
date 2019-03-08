import { combineReducers, Reducer, Store } from 'redux'
import createStore from './createStore'
import { createModel, Model, Modules } from './model'
import { reduceObj } from './utils'

export interface RStore extends Store {
  effects: any
}

export default function rabbit(models: Model[], options: any = {}): RStore {
  const initialModels: Model[] = []
  const initModel = {
    name: '@@rabbit',
    state: 0,
    reducers: {
      UPDATE(state) {
        return state + 1
      }
    }
  }

  const _models = createModel(initialModels.concat(initModel, models))
  const effects = getEffects(_models)

  const store = createStore(
    {
      reducers: getReducers(_models),
      effects,
      initialState: {}
    },
    options
  )

  // 初始化通知
  store.dispatch({ type: '@rabbit/init' })
  const newStore = { ...store, effects }

  return newStore

  function getReducers(models: Modules): Reducer {
    const reducers = reduceObj(models)((prev, name) => ({
      ...prev,
      [name]: models[name].reducers
    }))
    const rootReducers = combineReducers(reducers)
    return rootReducers
  }

  function getEffects(models: Modules) {
    const effects = reduceObj(models)((prev, name) => ({
      ...prev,
      ...models[name].effects
    }))
    return effects
  }
}
