let currentObserver = null;

const debounce = (callback) => {
  let currentCallback = null;
  return () => {
    clearTimeout(currentCallback);
    currentCallback = setTimeout(() => {
      callback();
    }, 16);
  }
}

export const observe = fn => {
  currentObserver = debounce(fn);
  fn();
  currentObserver = null;
}

export const observable = obj => {
  Object.keys(obj).forEach(key => {
    let _value = obj[key];
    const observers = new Set();
    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },
      set(value) {
        if (_value === value) return;
        if (JSON.stringify(_value) === JSON.stringify(value)) return;
        _value = value;
        observers.forEach(fn => fn());
      }
    })
  })
  return obj;
}