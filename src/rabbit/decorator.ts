import { ComponentType } from 'react'
import { Connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RStore } from '../core/rabbit'

interface DefaultProp {
  dispatch: Dispatch
}
export const inject = (namespace: string, connect: Connect, store?: RStore) => {
  const mapStateToProps = state =>
    namespace in state ? state[namespace] : state
  const effects = (store ? Object.keys(store.effects) : []).filter(
    item => item.indexOf(`${namespace}/`) === 0
  )

  const mapDispatchToProps = (dispatch: Dispatch) => {
    return effects.reduce((com, item) => {
      const fnName = item.split('/')[1]
      const fn = (rest: object | string) =>
        dispatch(
          typeof rest === 'string'
            ? { type: item, payload: rest }
            : { type: item, ...rest }
        )
      return {
        ...com,
        [fnName]: fn
      }
    }, {})
  }

  return Component => {
    class ReactComponent<P = {}, S = {}> extends Component<P & DefaultProp, S> {
      public static displayName = Component.name
      constructor(props) {
        super(props)
      }
    }
    return connect(
      mapStateToProps,
      mapDispatchToProps
    )(ReactComponent as ComponentType)
  }
}
