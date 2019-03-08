import rabbit from '../../src/core'

describe('checkModel', () => {
  it('namespace should be unique', () => {
    expect(() => rabbit([
      { name: 'test' },
      { name: 'test' }
    ])).toThrow('model 名称重复')
  })

  it('reducers must be object', () => {
    expect(() =>
      rabbit([{
        name: '_object',
        reducers: {},
      }])).not.toThrow();
  })

  it('reducers can not be string', () => {
    expect(() =>
      rabbit([{
        name: '_neither',
        reducers: '_',
      }])).toThrow('reducers 必须是一个对象');
  });

  it('effects should be plain object', () => {
    expect(() => {
      rabbit([{
        name: '_',
        effects: [],
      }]);
    }).toThrow('effects 必须是一个对象');
    expect(() => {
      rabbit([{
        name: '_',
        effects: '_',
      }]);
    }).toThrow('effects 必须是一个对象');
    expect(() => {
      rabbit([{
        name: '_',
        effects: {},
      }]);
    }).not.toThrow();
  });
})
