# awesome-listener
An awesome listener which you can register events, only callback, triggered once listener

## initialize

### node
```javascript
//via require
const Listener = require('awesome-listener).default
const listener = new Listener

//via import
import Listener from 'awesome-listener'
const listener = new Listener
```

### browser
```
const Listener = = AwesomeListener.default
const listener = new Listener
```

## API

### add(type, callback, options)
add listener.

**type** {string}, event type

**callback** {function}, callback function when event triggered

**options** {object}, available value props `only` and `once`. `only` to define if the event has the only listener, default `false`. `once` to define if the callback can be triggered only once, default `false`.

### remove(type, callback)

remove listener or event.

**type** {string}, event type

**callback** {function}, callback which to removed. when callback not set, listener will remove all callbacks of the type.

### dispatch(type, ...args)

**type**, {string}, event type to be dispatched

**args**, all arguments to pass to callback

### get(type) {array}, get listeners of specified event type

**type**, {string} event type

### isExist(type), {boolean} if the event registered

**type**, {string} event type

### forEach(fn), iterator the listener object

**fn(type, listeners)**, {function}, iterator callback function

**type**, {string} event type

**listeners**, {array} callbacks


## Examples

```javascript
  import Listener from 'awesome-listener'

  const listener = new Listener()
  const handleClickFirst = ()=>{
    console.log('click 1')
  }

  const handleClickSecond = ()=>{
    console.log('click 2')
  }

  const handleClickThird = ()=>{
    console.log('click 3')
  }

  //add listener
  listener.add('click', handleClickFirst)
  listener.add('click', handleClickSecond)
  listener.add('click', handleClickThird)

  //dispatch event
  listener.dispatch('click') //click 1, click 2

  //get
  listener.get('click') //[handleClickFirst, handleClickSecond, handleClickThird]

  listener.remove('click', handleClickSecond)
  listener.get('click') //[handleClickFirst, handleClickThird]

  listener.forEach((key, listeners)=>{
    console.log(key)
    console.log(listeners)
  }) 
  // click
  // [handleClickFirst, handleClickThird]

  listener.isExist('click') //true
  listener.remove('click')
  listener.get('click') //undefined
  listener.isExist('click') //false

```

