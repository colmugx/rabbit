import { AnyAction, Dispatch, ReducersMapObject, Store } from 'redux'
import { Component } from 'react';

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

export interface RStore extends Store {
  effects: any
}

export interface Modules {
  [key: string]: Model
}
interface DefaultProp {
  dispatch: Dispatch
}
export default function rabbit(model: Model[]): RStore
export function inject(namespace: string, connect: any, store?: RStore): <T extends {new(...args: any[]): {}}>(constructor: T) => T
