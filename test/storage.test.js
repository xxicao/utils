import storage from '../src/modules/storage';

describe('storage 模块', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  describe('localStorage', () => {
    it('应正确设置和获取值', () => {
      storage.setLocal('key', 'value');
      expect(storage.getLocal('key')).toBe('value');
    });

    it('应支持存储对象', () => {
      const obj = { name: 'test', age: 20 };
      storage.setLocal('obj', obj);
      expect(storage.getLocal('obj')).toEqual(obj);
    });

    it('应支持存储数组', () => {
      const arr = [1, 2, 3];
      storage.setLocal('arr', arr);
      expect(storage.getLocal('arr')).toEqual(arr);
    });

    it('应支持存储数字', () => {
      storage.setLocal('num', 42);
      expect(storage.getLocal('num')).toBe(42);
    });

    it('应支持存储布尔值', () => {
      storage.setLocal('bool', true);
      expect(storage.getLocal('bool')).toBe(true);
    });

    it('空 key 不应存储', () => {
      storage.setLocal('', 'value');
      expect(storage.getLocal('')).toBeNull();
    });

    it('获取不存在的 key 应返回 null', () => {
      expect(storage.getLocal('notexist')).toBeNull();
    });

    it('removeLocal 应删除指定 key', () => {
      storage.setLocal('toRemove', 'value');
      storage.removeLocal('toRemove');
      expect(storage.getLocal('toRemove')).toBeNull();
    });

    it('clearLocal 应清空所有', () => {
      storage.setLocal('a', 1);
      storage.setLocal('b', 2);
      storage.clearLocal();
      expect(storage.getLocal('a')).toBeNull();
      expect(storage.getLocal('b')).toBeNull();
    });
  });

  describe('sessionStorage', () => {
    it('应正确设置和获取值', () => {
      storage.setSession('key', 'value');
      expect(storage.getSession('key')).toBe('value');
    });

    it('应支持存储对象', () => {
      const obj = { name: 'test' };
      storage.setSession('obj', obj);
      expect(storage.getSession('obj')).toEqual(obj);
    });

    it('空 key 不应存储', () => {
      storage.setSession('', 'value');
      expect(storage.getSession('')).toBeNull();
    });

    it('获取不存在的 key 应返回 null', () => {
      expect(storage.getSession('notexist')).toBeNull();
    });

    it('removeSession 应删除指定 key', () => {
      storage.setSession('toRemove', 'value');
      storage.removeSession('toRemove');
      expect(storage.getSession('toRemove')).toBeNull();
    });

    it('clearSession 应清空所有', () => {
      storage.setSession('a', 1);
      storage.setSession('b', 2);
      storage.clearSession();
      expect(storage.getSession('a')).toBeNull();
      expect(storage.getSession('b')).toBeNull();
    });
  });
});
