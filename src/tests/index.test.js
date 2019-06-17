import Listener from '../'


describe('test listener', () => {

  test('add and dispatch', () => {
    const listener = new Listener;
    const callback = jest.fn()
    const callback2 = jest.fn()

    listener.add('test', callback)
    listener.add('test', callback2)
    listener.add('test only', callback, { only: true })
    listener.add('test only', callback2, { only: true }) //覆盖
    listener.add('test once', callback, { once: true })
    listener.add('test once', callback2, { once: true })
    listener.add('test once only', callback, { only: true, once: true })
    listener.add('test once only', callback2, { only: true, once: true })

    expect(listener.get('test')).toEqual([
      { only: false, once: false, callback },
      { only: false, once: false, callback: callback2 }
    ])

    listener.dispatch('test')
    listener.dispatch('test', 'hello', 'world')

    expect(callback.mock.calls).toEqual([[], ["hello", "world"]])
    expect(callback2.mock.calls).toEqual([[], ["hello", "world"]])

    callback.mockClear()
    callback2.mockClear()

    listener.dispatch('test only', 'hello')
    expect(callback.mock.calls).toHaveLength(0)
    expect(callback2.mock.calls).toEqual([["hello"]])

    callback.mockClear()
    callback2.mockClear()

    listener.dispatch('test once', 'hello')
    expect(callback.mock.calls).toEqual([["hello"]])
    expect(callback2.mock.calls).toEqual([["hello"]])


    callback.mockClear()
    callback2.mockClear()

    listener.dispatch('test once', 'hello')
    expect(callback.mock.calls).toEqual([])
    expect(callback2.mock.calls).toEqual([])


    callback.mockClear()
    callback2.mockClear()


    listener.dispatch('test once only', 'hello')
    expect(callback.mock.calls).toEqual([])
    expect(callback2.mock.calls).toEqual([["hello"]])

    callback.mockClear()
    callback2.mockClear()

    listener.dispatch('test once only', 'hello')
    expect(callback.mock.calls).toEqual([])
    expect(callback2.mock.calls).toEqual([])

  })

  test('add remove', () => {
    const listener = new Listener;
    const callback = jest.fn()
    const callback2 = jest.fn()
    const callback3 = jest.fn()

    listener.add('test', callback)
    listener.add('test', callback2)
    listener.add('test', callback3)

    expect(listener.isExist('test')).toBeTruthy()

    listener.remove('test', callback2)
    expect(listener.get('test')).toEqual([{
      callback: callback,
      only: false,
      once: false
    }, {
      callback: callback3,
      only: false,
      once: false
    }])
    expect(listener.isExist('test')).toBeTruthy()
    listener.remove('test')
    expect(listener.isExist('test')).toBeFalsy()

    listener.add('test 1', callback)
    expect(listener.get('test 1')).toEqual([{
      callback: callback,
      only: false,
      once: false
    }])
    listener.remove('test 1', callback)
    expect(listener.isExist('test 1')).toBeFalsy()


    listener.add('test only', callback, { only: true })
    listener.add('test only', callback2, { only: true })
    expect(listener.get('test only')).toEqual({
      callback: callback2,
      only: true,
      once: undefined
    })
    listener.remove('test only', callback)
    expect(listener.isExist('test only')).toBeTruthy()
    listener.remove('test only', callback2)
    expect(listener.isExist('test only')).toBeFalsy()

    listener.add('test to only', callback, { only: true })
    listener.add('test to only', callback2)
    expect(listener.get('test to only')).toEqual([{
      callback: callback2,
      only: false,
      once: false
    }])
  })
})