import {
  Model,
  EffectsMapObject
} from './src/core/model'
import { Store, ReducersMapObject } from 'redux'

export function inject(store: string, connect: any): any
export default function rabbit(model: Model[]): Store

export {
  Model,
  EffectsMapObject,
  ReducersMapObject
}
