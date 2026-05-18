import cookie from '../src/modules/cookie';

describe('cookie 模块', () => {
  beforeEach(() => {
    document.cookie = '';
  });

  describe('setCookie / getCookie', () => {
    it('应正确设置和读取 Cookie', () => {
      cookie.setCookie('test', 'hello', 1);
      expect(cookie.getCookie('test')).toBe('hello');
    });

    it('应正确处理中文值（encodeURIComponent 编码）', () => {
      cookie.setCookie('name', '张三', 1);
      expect(cookie.getCookie('name')).toBe('张三');
    });

    it('应正确处理特殊字符', () => {
      cookie.setCookie('special', 'a=b&c=d', 1);
      expect(cookie.getCookie('special')).toBe('a=b&c=d');
    });

    it('读取不存在的 Cookie 应返回空字符串', () => {
      expect(cookie.getCookie('notexist')).toBe('');
    });

    it('未传天数时应默认 30 天', () => {
      cookie.setCookie('default', 'value');
      expect(cookie.getCookie('default')).toBe('value');
    });

    it('应支持自定义 path', () => {
      cookie.setCookie('pathTest', 'val', 1, '/');
      expect(cookie.getCookie('pathTest')).toBe('val');
    });
  });

  describe('deleteCookie', () => {
    it('应删除已设置的 Cookie', () => {
      cookie.setCookie('toDelete', 'value', 1);
      expect(cookie.getCookie('toDelete')).toBe('value');
      cookie.deleteCookie('toDelete');
      expect(cookie.getCookie('toDelete')).toBe('');
    });

    it('删除不存在的 Cookie 不应报错', () => {
      expect(() => cookie.deleteCookie('ghost')).not.toThrow();
    });
  });
});
