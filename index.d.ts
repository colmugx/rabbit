import {
  Model,
  EffectsMapObject
} from './src/core/model'
import { Store, ReducersMapObject } from 'redux'
import { RStore } from './src/core/rabbit'

export function inject(namespace: string, connect: any, store?: RStore): any
export default function rabbit(model: Model[]): RStore

export {
  Model,
  EffectsMapObject,
  ReducersMapObject
}
