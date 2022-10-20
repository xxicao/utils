export function curry(fn, args) {
  var length = fn.length;
  args = args || [];
  return function() {
    var _args = args.slice(0),arg, i;
    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      _args.push(arg);
    }
    if (_args.length < length) {
      return curry.call(this, fn, _args);
    } else {
      return fn.apply(this, _args);
    }
  }
}
export function debounce(fn, delay) {
  const ndelay = delay || 300;
  let timer;
  return function (...args) {
    const th = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn.apply(th, args);
    }, ndelay);
  };
}
export function throttle(fn, interval) {
  let last;
  let timer;
  const ninterval = interval || 300;
  return function (...args) {
    const th = this;
    const now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(th, args);
      }, ninterval);
    } else {
      last = now;
      fn.apply(th, args);
    }
  };
}