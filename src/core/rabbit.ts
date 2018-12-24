import { combineReducers, Reducer, Store } from 'redux'
import createStore from './createStore'
import { createModel, Model, Modules } from './model'
import { reduceObj } from './utils'

export default function rabbit(models: Model[], options: any = {}): Store {
  const initialModels = []

  const _models = createModel(models)

  const store = createStore({
    reducers: getReducers(_models),
    effects: getEffects(_models),
    initialState: {},
  })

  return store

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
