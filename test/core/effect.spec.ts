import rabbit from '../../src/core'

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout))

describe('effects', () => {
  it('put action', done => {
    const app = rabbit([{
      name: 'count',
      state: 0,
      reducers: {
        add(state, { payload }: any) {
          return state + payload || 1
        }
      },
      effects: {
        async addDelay({ payload }, { dispatch }) {
          await delay(100)
          await dispatch({ type: 'add', payload })
        }
      }
    }])
    app.dispatch({ type: 'count/addDelay', payload: 2 })
    expect(app.getState().count).toEqual(0)
    setTimeout(() => {
      expect(app.getState().count).toEqual(2)
      done()
    }, 200)
  })

  it('put action with namespace will get a warning', done => {
    const app = rabbit([{
      name: 'count',
      state: 0,
      reducers: {
        add(state, { payload }: any) {
          return state + payload || 1
        },
        obj: {}
      },
      effects: {
        async addDelay({ payload }, { dispatch }) {
          await delay(100)
          await dispatch({ type: 'add', payload })
        }
      }
    }])
    app.dispatch({ type: 'count/addDelay', payload: 2 })
    expect(app.getState().count).toEqual(0)
    setTimeout(() => {
      expect(app.getState().count).toEqual(2)
      done()
    }, 200)
  })
})
