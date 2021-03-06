import {
  applyMiddleware,
  compose,
  createStore,
  Middleware,
  Reducer,
  StoreEnhancer
} from 'redux'
import RThunk from 'redux-thunk'
import createEffect from './effect'
import { EffectsMapObject } from './model'

export interface ICreate {
  reducers: Reducer
  effects: EffectsMapObject
  initialState: any
}

export interface IOptions {
  middleware?: Middleware[]
}

export default function(
  { reducers, effects, initialState }: ICreate,
  options: IOptions
) {
  const composeEnhancers =
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose

  const middlewares: Middleware[] = [createEffect(effects), RThunk]
  if (options.middleware) {
    middlewares.push(...options.middleware)
  }

  const enhancers: StoreEnhancer[] = [applyMiddleware(...middlewares)]

  return createStore(reducers, initialState, composeEnhancers(...enhancers))
}
