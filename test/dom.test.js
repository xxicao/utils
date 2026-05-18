import dom from '../src/modules/dom';

describe('dom 模块', () => {
  describe('preloadImage', () => {
    it('传入空值应 reject', async () => {
      await expect(dom.preloadImage('')).rejects.toThrow('url must be a non-empty string');
    });

    it('传入非字符串应 reject', async () => {
      await expect(dom.preloadImage(123)).rejects.toThrow('url must be a non-empty string');
    });

    it('加载成功应 resolve true', async () => {
      // 在 jsdom 中模拟 Image 的 onload
      const originalImage = global.Image;
      global.Image = class {
        constructor() {
          setTimeout(() => this.onload(), 10);
        }
      };
      const result = await dom.preloadImage('https://example.com/test.png');
      expect(result).toBe(true);
      global.Image = originalImage;
    });

    it('加载失败应 reject', async () => {
      const originalImage = global.Image;
      global.Image = class {
        constructor() {
          setTimeout(() => this.onerror(new Event('error')), 10);
        }
      };
      await expect(dom.preloadImage('https://invalid.example.com/nonexistent.png')).rejects.toThrow();
      global.Image = originalImage;
    });
  });

  describe('injectScript', () => {
    it('应创建 script 元素并添加到 head', async () => {
      const scriptSrc = 'data:text/javascript,void(0)';
      const promise = dom.injectScript(scriptSrc);
      const script = document.head.querySelector(`script[src="${scriptSrc}"]`);
      expect(script).not.toBeNull();
      script.dispatchEvent(new Event('load'));
      await expect(promise).resolves.toBeUndefined();
    });

    it('加载失败应 reject', async () => {
      const scriptSrc = 'https://invalid.example.com/nonexistent.js';
      const promise = dom.injectScript(scriptSrc);
      const script = document.head.querySelector(`script[src="${scriptSrc}"]`);
      script.dispatchEvent(new Event('error'));
      await expect(promise).rejects.toThrow();
    });
  });

  describe('injectCss', () => {
    it('应创建 link 元素并添加到 head', async () => {
      const cssHref = 'https://cdn.example.com/style.css';
      const promise = dom.injectCss(cssHref);
      const link = document.head.querySelector(`link[href="${cssHref}"]`);
      expect(link).not.toBeNull();
      expect(link.rel).toBe('stylesheet');
      link.dispatchEvent(new Event('load'));
      await expect(promise).resolves.toBeUndefined();
    });

    it('加载失败应 reject', async () => {
      const cssHref = 'https://invalid.example.com/style.css';
      const promise = dom.injectCss(cssHref);
      const link = document.head.querySelector(`link[href="${cssHref}"]`);
      link.dispatchEvent(new Event('error'));
      await expect(promise).rejects.toThrow();
    });
  });

  describe('fullscreen', () => {
    it('传入 null 不应报错', () => {
      expect(() => dom.fullscreen(null)).not.toThrow();
    });

    it('应调用元素的 requestFullscreen', () => {
      const el = document.createElement('div');
      el.requestFullscreen = vi.fn();
      dom.fullscreen(el);
      expect(el.requestFullscreen).toHaveBeenCalled();
    });

    it('应兼容 webkit 前缀', () => {
      const el = document.createElement('div');
      el.webkitRequestFullscreen = vi.fn();
      dom.fullscreen(el);
      expect(el.webkitRequestFullscreen).toHaveBeenCalled();
    });
  });

  describe('exitFullscreen', () => {
    it('应调用 document.exitFullscreen', () => {
      document.exitFullscreen = vi.fn();
      dom.exitFullscreen();
      expect(document.exitFullscreen).toHaveBeenCalled();
    });

    it('应兼容 webkit 前缀', () => {
      delete document.exitFullscreen;
      document.webkitExitFullscreen = vi.fn();
      dom.exitFullscreen();
      expect(document.webkitExitFullscreen).toHaveBeenCalled();
    });
  });

  describe('copyToClipboard', () => {
    it('应优先使用 Clipboard API', async () => {
      const originalClipboard = navigator.clipboard;
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn().mockResolvedValue(undefined) },
        writable: true,
        configurable: true,
      });
      const result = await dom.copyToClipboard('hello');
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello');
      expect(result).toBe(true);
      Object.defineProperty(navigator, 'clipboard', {
        value: originalClipboard,
        writable: true,
        configurable: true,
      });
    });

    it('Clipboard API 失败时应降级到 execCommand', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
        writable: true,
        configurable: true,
      });
      const result = await dom.copyToClipboard('hello');
      expect(result).toBe(false);
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: true,
        configurable: true,
      });
    });

    it('无 Clipboard API 时应使用 execCommand', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: true,
        configurable: true,
      });
      document.execCommand = vi.fn().mockReturnValue(true);
      const result = await dom.copyToClipboard('hello');
      expect(document.execCommand).toHaveBeenCalledWith('copy');
      expect(result).toBe(true);
    });
  });

  describe('scrollToTop', () => {
    it('在页面顶部时不应滚动', () => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      const mockRaf = vi.fn();
      window.requestAnimationFrame = mockRaf;
      dom.scrollToTop();
      expect(mockRaf).not.toHaveBeenCalled();
    });
  });

  describe('addClass', () => {
    it('应通过 classList 添加类名', () => {
      const el = document.createElement('div');
      dom.addClass(el, 'active');
      expect(el.classList.contains('active')).toBe(true);
    });

    it('传入空值不应报错', () => {
      expect(() => dom.addClass(null, 'active')).not.toThrow();
      expect(() => dom.addClass(document.createElement('div'), '')).not.toThrow();
    });
  });

  describe('removeClass', () => {
    it('应通过 classList 移除类名', () => {
      const el = document.createElement('div');
      el.classList.add('active');
      dom.removeClass(el, 'active');
      expect(el.classList.contains('active')).toBe(false);
    });

    it('传入空值不应报错', () => {
      expect(() => dom.removeClass(null, 'active')).not.toThrow();
      expect(() => dom.removeClass(document.createElement('div'), '')).not.toThrow();
    });
  });

  describe('getScrollPosition', () => {
    it('应返回包含 x 和 y 的对象', () => {
      const pos = dom.getScrollPosition();
      expect(pos).toHaveProperty('x');
      expect(pos).toHaveProperty('y');
      expect(typeof pos.x).toBe('number');
      expect(typeof pos.y).toBe('number');
    });

    it('页面未滚动时应返回 0', () => {
      const pos = dom.getScrollPosition();
      expect(pos.x).toBe(0);
      expect(pos.y).toBe(0);
    });
  });
});
