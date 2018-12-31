import { combineReducers, Reducer, Store } from 'redux'
import createStore from './createStore'
import { createModel, Model, Modules } from './model'
import { reduceObj } from './utils'

export interface RStore extends Store {
  effects: any
}

export default function rabbit(models: Model[], options: any = {}): RStore {
  const initialModels = []

  const _models = createModel(models)
  const _effects = getEffects(_models)

  const store = createStore({
    reducers: getReducers(_models),
    effects: _effects,
    initialState: {},
  })

  const newStore = {...store, effects: _effects }

  return newStore

  function getReducers(models: Modules): Reducer {
    const reducers = reduceObj(models)((prev, name) => ({
      ...prev,
      [name]: models[name].reducers,
    }))
    const rootReducers = combineReducers(reducers)
    return rootReducers
  }

  function getEffects(models: Modules) {
    const effects = reduceObj(models)((prev, name) => ({
      ...prev,
      ...models[name].effects,
    }))
    return effects
  }
}
