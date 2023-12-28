const toString = Object.prototype.toString;

export function isDef(val) {
  return val !== undefined && val !== null;
}

export function is(val, type) {
  return toString.call(val) === `[object ${type}]`;
}

export function isString(val) {
  return is(val, 'String');
}

export function isNumber(val) {
  return is(val, 'Number');
}

export function isObject(val) {
  return val !== null && is(val, 'Object');
}

export function isArray(val) {
  return val && Array.isArray(val);
}

export function isFunction(val) {
  return typeof val === 'function';
}