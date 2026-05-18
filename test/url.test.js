import * as url from '../src/modules/url';

describe('url 模块', () => {
  describe('buildQueryString', () => {
    it('应将对象转为查询字符串', () => {
      expect(url.buildQueryString({ name: 'test', page: 1 })).toBe('name=test&page=1');
    });

    it('应处理特殊字符编码', () => {
      expect(url.buildQueryString({ q: 'hello world' })).toBe('q=hello%20world');
    });

    it('应过滤 undefined、null 和空字符串', () => {
      expect(url.buildQueryString({ a: '1', b: null, c: undefined, d: '' })).toBe('a=1');
    });

    it('空对象应返回空字符串', () => {
      expect(url.buildQueryString({})).toBe('');
    });

    it('非对象输入应返回空字符串', () => {
      expect(url.buildQueryString(null)).toBe('');
      expect(url.buildQueryString('abc')).toBe('');
    });
  });

  describe('getUrlParam', () => {
    it('应从 URL 中获取指定参数值', () => {
      expect(url.getUrlParam('name', 'https://example.com?name=test&page=1')).toBe('test');
    });

    it('参数不存在时应返回 null', () => {
      expect(url.getUrlParam('foo', 'https://example.com?name=test')).toBe(null);
    });

    it('无参数名时应返回 null', () => {
      expect(url.getUrlParam('')).toBe(null);
      expect(url.getUrlParam(null)).toBe(null);
    });

    it('应解码编码后的参数值', () => {
      expect(url.getUrlParam('q', 'https://example.com?q=hello%20world')).toBe('hello world');
    });
  });

  describe('isExternalLink', () => {
    it('应以 http 开头的链接为外部链接', () => {
      expect(url.isExternalLink('http://example.com')).toBe(true);
    });

    it('应以 https 开头的链接为外部链接', () => {
      expect(url.isExternalLink('https://example.com')).toBe(true);
    });

    it('相对路径应不为外部链接', () => {
      expect(url.isExternalLink('/path/to/page')).toBe(false);
    });

    it('空值应返回 false', () => {
      expect(url.isExternalLink('')).toBe(false);
      expect(url.isExternalLink(null)).toBe(false);
    });
  });

  describe('updateUrlParams', () => {
    it('非对象输入应不报错', () => {
      expect(() => url.updateUrlParams(null)).not.toThrow();
      expect(() => url.updateUrlParams('')).not.toThrow();
    });
  });

  describe('getBaseUrl', () => {
    it('应去除查询参数和哈希', () => {
      expect(url.getBaseUrl('https://example.com/path?name=test#section')).toBe('https://example.com/path');
    });

    it('不含查询参数的 URL 应原样返回', () => {
      expect(url.getBaseUrl('https://example.com/path')).toBe('https://example.com/path');
    });
  });

  describe('parseQueryString', () => {
    it('应正确解析 URL 参数', () => {
      const result = url.parseQueryString('https://example.com?name=test&age=20');
      expect(result).toEqual({ name: 'test', age: '20' });
    });

    it('应处理中文参数', () => {
      const result = url.parseQueryString('https://example.com?name=' + encodeURIComponent('张三'));
      expect(result.name).toBe('张三');
    });

    it('无参数 URL 应返回空对象', () => {
      const result = url.parseQueryString('https://example.com');
      expect(result).toEqual({});
    });

    it('空字符串应返回空对象', () => {
      const result = url.parseQueryString('');
      expect(result).toEqual({});
    });
  });
});
