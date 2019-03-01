import rabbit, { inject } from "rabbit"
import { connect } from '@tarojs/redux'


const models = [
  {
    name: "counter",
    state: {
      count: 0
    },
    reducers: {
      update({ count }, { payload }) {
        return {
          count: count + payload
        }
      }
    },
    effects: {
      increment({ payload = 1 }, { dispatch }) {
        dispatch({ type: 'update', payload })
      },
      decrement({ payload = -1 }, { dispatch }) {
        dispatch({ type: 'update', payload })
      },
      async asyncIncrement(_, { dispatch }) {
        await new Promise(resolve => {
          setTimeout(resolve, 2000)
        })
        await dispatch({ type: 'increment' })
      }
    }
  }
]

const store = rabbit(models, {
  middleware: [require('redux-logger').createLogger()]
})
export const Inject = n => inject(n, connect, store)
export default store
