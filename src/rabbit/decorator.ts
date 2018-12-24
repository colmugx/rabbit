import { ComponentType } from 'react'
import { connect as rc } from './connect'


export const inject = (store: string, connect = rc) => {

  const mapStateToProps = state => store in state ? state[store] : state

  return Component => {
    class ReactComponent extends Component {
      constructor (props) {
        super(props)
      }
    }

    ReactComponent.displayName = Component.name
    return connect(mapStateToProps)(ReactComponent as ComponentType)
  }
}
