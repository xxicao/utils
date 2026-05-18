import { isDef, is, isString, isNumber, isObject, isArray, isFunction, isBoolean, isPlainObject, isEmpty, isPromise, isEmail } from '../src/modules/type';

describe('type 模块', () => {
  describe('isDef', () => {
    it('有值应返回 true', () => {
      expect(isDef(0)).toBe(true);
      expect(isDef('')).toBe(true);
      expect(isDef(false)).toBe(true);
    });

    it('undefined 和 null 应返回 false', () => {
      expect(isDef(undefined)).toBe(false);
      expect(isDef(null)).toBe(false);
    });
  });

  describe('is', () => {
    it('应正确判断类型', () => {
      expect(is('hello', 'String')).toBe(true);
      expect(is(123, 'Number')).toBe(true);
      expect(is({}, 'Object')).toBe(true);
      expect(is([], 'Array')).toBe(true);
    });

    it('类型不匹配应返回 false', () => {
      expect(is('hello', 'Number')).toBe(false);
      expect(is(123, 'String')).toBe(false);
    });
  });

  describe('isString', () => {
    it('字符串应返回 true', () => {
      expect(isString('hello')).toBe(true);
      expect(isString('')).toBe(true);
    });

    it('非字符串应返回 false', () => {
      expect(isString(123)).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
    });
  });

  describe('isNumber', () => {
    it('数字应返回 true', () => {
      expect(isNumber(123)).toBe(true);
      expect(isNumber(0)).toBe(true);
      expect(isNumber(NaN)).toBe(true); // NaN 的类型是 Number
    });

    it('非数字应返回 false', () => {
      expect(isNumber('123')).toBe(false);
      expect(isNumber(null)).toBe(false);
    });
  });

  describe('isObject', () => {
    it('普通对象应返回 true', () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ a: 1 })).toBe(true);
    });

    it('null 应返回 false', () => {
      expect(isObject(null)).toBe(false);
    });

    it('数组应返回 false', () => {
      expect(isObject([])).toBe(false);
    });
  });

  describe('isArray', () => {
    it('数组应返回 true', () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2, 3])).toBe(true);
    });

    it('非数组应返回 false', () => {
      expect(isArray({})).toBe(false);
      expect(isArray('123')).toBe(false);
    });

    it('null 和 undefined 应返回假值', () => {
      expect(isArray(null)).toBeFalsy();
      expect(isArray(undefined)).toBeFalsy();
    });
  });

  describe('isFunction', () => {
    it('普通函数应返回 true', () => {
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(function () {})).toBe(true);
    });

    it('非函数应返回 false', () => {
      expect(isFunction('hello')).toBe(false);
      expect(isFunction(123)).toBe(false);
      expect(isFunction(null)).toBe(false);
    });
  });

  describe('isBoolean', () => {
    it('布尔值应返回 true', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
    });

    it('非布尔值应返回 false', () => {
      expect(isBoolean(0)).toBe(false);
      expect(isBoolean('true')).toBe(false);
      expect(isBoolean(null)).toBe(false);
      expect(isBoolean(undefined)).toBe(false);
    });
  });

  describe('isPlainObject', () => {
    it('通过 {} 创建的对象应返回 true', () => {
      expect(isPlainObject({})).toBe(true);
      expect(isPlainObject({ a: 1 })).toBe(true);
    });

    it('通过 Object.create(null) 创建的对象应返回 true', () => {
      expect(isPlainObject(Object.create(null))).toBe(true);
    });

    it('数组应返回 false', () => {
      expect(isPlainObject([])).toBe(false);
    });

    it('Date 等内置对象应返回 false', () => {
      expect(isPlainObject(new Date())).toBe(false);
    });

    it('null 应返回 false', () => {
      expect(isPlainObject(null)).toBe(false);
    });
  });

  describe('isEmpty', () => {
    it('null 和 undefined 应返回 true', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
    });

    it('空字符串应返回 true', () => {
      expect(isEmpty('')).toBe(true);
    });

    it('空数组应返回 true', () => {
      expect(isEmpty([])).toBe(true);
    });

    it('空对象应返回 true', () => {
      expect(isEmpty({})).toBe(true);
    });

    it('非空值应返回 false', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty([1])).toBe(false);
      expect(isEmpty({ a: 1 })).toBe(false);
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty(false)).toBe(false);
    });
  });

  describe('isPromise', () => {
    it('Promise 对象应返回 true', () => {
      expect(isPromise(Promise.resolve())).toBe(true);
    });

    it('thenable 对象应返回 true', () => {
      expect(isPromise({ then: () => {}, catch: () => {} })).toBe(true);
    });

    it('非 Promise 应返回 false', () => {
      expect(isPromise({})).toBe(false);
      expect(isPromise(null)).toBe(false);
      expect(isPromise('promise')).toBe(false);
    });
  });

  describe('isEmail', () => {
    it('应正确识别合法邮箱', () => {
      expect(isEmail('test@example.com')).toBe(true);
      expect(isEmail('user.name+tag@domain.co')).toBe(true);
    });

    it('应拒绝非法邮箱', () => {
      expect(isEmail('invalid')).toBe(false);
      expect(isEmail('user@')).toBe(false);
      expect(isEmail('@domain.com')).toBe(false);
    });

    it('空值和非字符串应返回 false', () => {
      expect(isEmail('')).toBe(false);
      expect(isEmail(null)).toBe(false);
      expect(isEmail(undefined)).toBe(false);
    });
  });
});
