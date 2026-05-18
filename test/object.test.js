import { deepClone } from '../src/modules/object';

describe('object 模块', () => {
  describe('deepClone', () => {
    it('应深拷贝普通对象', () => {
      const obj = { a: 1, b: { c: 2 } };
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.b).not.toBe(obj.b);
    });

    it('应深拷贝数组', () => {
      const arr = [1, [2, 3], { a: 4 }];
      const cloned = deepClone(arr);
      expect(cloned).toEqual(arr);
      expect(cloned).not.toBe(arr);
      expect(cloned[1]).not.toBe(arr[1]);
    });

    it('应深拷贝 Date 对象', () => {
      const date = new Date('2024-01-01');
      const cloned = deepClone(date);
      expect(cloned.getTime()).toBe(date.getTime());
      expect(cloned).not.toBe(date);
    });

    it('应深拷贝 RegExp 对象', () => {
      const regex = /test/gi;
      const cloned = deepClone(regex);
      expect(cloned.source).toBe(regex.source);
      expect(cloned.flags).toBe(regex.flags);
      expect(cloned).not.toBe(regex);
    });

    it('原始值应原样返回', () => {
      expect(deepClone(42)).toBe(42);
      expect(deepClone('hello')).toBe('hello');
      expect(deepClone(null)).toBeNull();
      expect(deepClone(undefined)).toBeUndefined();
    });

    it('不应拷贝继承属性', () => {
      const parent = { inherited: true };
      const child = Object.create(parent);
      child.own = 'value';
      const cloned = deepClone(child);
      expect(cloned.own).toBe('value');
      expect(cloned.inherited).toBeUndefined();
    });
  });
});
