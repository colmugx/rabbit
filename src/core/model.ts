import { AnyAction, Dispatch, ReducersMapObject } from 'redux'
import { mergeReducer } from './reducer'
import { assert, isObject } from './utils'

interface EffectsType {
  dispatch: Dispatch<AnyAction>
  select: (state: any) => void
}
export interface EffectsMapObject {
  [key: string]: (action: AnyAction, effect: EffectsType) => void
}

export interface Model {
  name: string
  state?: any
  reducers?: ReducersMapObject
  effects?: EffectsMapObject
}

export interface Modules {
  [key: string]: Model
}

export function checkModel(model: Model, prevModel: Model[]): void {
  const { name, reducers, effects } = model
  assert(
    name && typeof name === 'string',
    `名称必须被创建且必须是 string，但得到${typeof name}`
  )
  // 不可重复
  assert(!prevModel.some(model => model.name === name), 'model 名称重复')

  if (reducers) {
    assert(isObject(reducers), 'reducers 必须是一个对象')
  }
  if (effects) {
    assert(isObject(effects), 'effects 必须是一个对象')
  }
}

export function createModel(models: any[]): Modules {
  const _models: Model[] = models.reduce((prev: Model[], model, idx) => {
    const newModel = model
    newModel.name = model.name || `store${idx}`
    checkModel(newModel, prev)
    newModel.reducers = mergeReducer(model, 'reducers')
    newModel.effects = mergeReducer(model, 'effects')
    return prev.concat(newModel)
  }, [])

  const modules: Modules = _models.reduce(
    (prev, model: Model) => ({
      ...prev,
      [model.name]: model
    }),
    {}
  )

  return modules
}
