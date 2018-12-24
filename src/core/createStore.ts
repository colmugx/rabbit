import {
  applyMiddleware,
  compose,
  createStore,
  Middleware,
  Reducer,
} from 'redux'
import RThunk from 'redux-thunk'
import CreateEffect from './effect'
import { EffectsMapObject } from './model'

export interface ICreate {
  reducers: Reducer
  effects: EffectsMapObject
  initialState: any
}

export default function({ reducers, effects, initialState }: ICreate) {
  const composeEnhancers = typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

  const middlewares: Middleware[] = [CreateEffect(effects), RThunk]

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(require('redux-logger').createLogger())
  }

  const enhancers: any[] = [applyMiddleware(...middlewares)]

  return createStore(reducers, initialState, composeEnhancers(...enhancers))
}
