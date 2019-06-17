class Listener {
  constructor() {
    this.listeners = {}
    // this.onceListeners = {}
  }

  /**
   * 
   * @param {string} type 
   * @param {function} callback 
   * @param {object} options 
   */
  add(type, callback, options = {
    only: false,
    once: false
  }) {
    const { only, once } = options
    if (!this.listeners[type]) {
      this.listeners[type] = only ? { callback, only, once } : [{ callback, only, once }]
    } else if (only) {
      this.listeners[type] = { callback, only, once }
    } else if (Array.isArray(this.listeners[type])) {
      this.listeners[type].push({ callback, only, once })
    } else {
      this.listeners[type] = [{ callback, only, once }]
    }
  }

  remove(type, callback) {
    if (!callback) {
      delete this.listeners[type]
    } else if (Array.isArray(this.listeners[type])) {
      const callbacks = this.listeners[type].filter(item => item.callback !== callback)
      if (!callbacks.length) {
        delete this.listeners[type]
      } else {
        this.listeners[type] = callbacks
      }
    } else if (this.listeners[type] && callback === this.listeners[type].callback) {
      delete this.listeners[type]
    }
  }

  isExist(type) {
    return !!this.listeners[type]
  }

  get(type) {
    const ret = this.listeners[type]
    if (Array.isArray(ret)) return ret.map(item => item.callback)
    if (ret) return [ret.callback]
    return ret;
  }


  dispatch(type, ...args) {
    if (Array.isArray(this.listeners[type])) {
      const callbacks = this.listeners[type].filter(item => {
        item.callback.call(null, ...args)
        if (item.once) return false;
        return true;
      })

      if (!callbacks.length) {
        delete this.listeners[type]
      } else {
        this.listeners[type] = callbacks
      }
    } else {
      if (this.listeners[type]) {
        this.listeners[type].callback.call(null, ...args)

        if (this.listeners[type].once) {
          delete this.listeners[type]
        }
      }
    }
  }

  forEach(fn) {
    const keys = Object.keys(this.listeners)
    keys.forEach(key => fn.call(this, key, this.get(key)))
  }
}

export default Listener;