import device from '../src/modules/device';

describe('device 模块', () => {
  const originalUserAgent = window.navigator.userAgent;
  const originalMaxTouchPoints = navigator.maxTouchPoints;

  afterEach(() => {
    // 还原 userAgent
    Object.defineProperty(window.navigator, 'userAgent', {
      value: originalUserAgent,
      configurable: true,
    });
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: originalMaxTouchPoints,
      configurable: true,
    });
  });

  function mockUA(ua, maxTouchPoints = 0) {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: ua,
      configurable: true,
    });
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: maxTouchPoints,
      configurable: true,
    });
  }

  describe('isPC', () => {
    it('PC 端 UA 应返回 true', () => {
      mockUA('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0');
      expect(device.isPC()).toBe(true);
    });

    it('iPhone UA 应返回 false', () => {
      mockUA('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)');
      expect(device.isPC()).toBe(false);
    });

    it('Android UA 应返回 false', () => {
      mockUA('Mozilla/5.0 (Linux; Android 14; Pixel 8) Chrome/120.0.0.0 Mobile');
      expect(device.isPC()).toBe(false);
    });
  });

  describe('isMobile', () => {
    it('移动端 UA 应返回 true', () => {
      mockUA('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)');
      expect(device.isMobile()).toBe(true);
    });

    it('PC 端 UA 应返回 false', () => {
      mockUA('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0');
      expect(device.isMobile()).toBe(false);
    });
  });

  describe('isIOS', () => {
    it('iPhone UA 应返回 true', () => {
      mockUA('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)');
      expect(device.isIOS()).toBe(true);
    });

    it('iPad UA 应返回 true', () => {
      mockUA('Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)');
      expect(device.isIOS()).toBe(true);
    });

    it('Mac + 触控应返回 true（iPadOS）', () => {
      mockUA('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 2);
      expect(device.isIOS()).toBe(true);
    });

    it('Mac 无触控应返回 false', () => {
      mockUA('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 0);
      expect(device.isIOS()).toBe(false);
    });

    it('Android UA 应返回 false', () => {
      mockUA('Mozilla/5.0 (Linux; Android 14; Pixel 8)');
      expect(device.isIOS()).toBe(false);
    });
  });

  describe('isAndroid', () => {
    it('Android UA 应返回 true', () => {
      mockUA('Mozilla/5.0 (Linux; Android 14; Pixel 8)');
      expect(device.isAndroid()).toBe(true);
    });

    it('Adr 关键字应返回 true', () => {
      mockUA('Mozilla/5.0 (Linux; Adr 14; Pixel 8)');
      expect(device.isAndroid()).toBe(true);
    });

    it('iPhone UA 应返回 false', () => {
      mockUA('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)');
      expect(device.isAndroid()).toBe(false);
    });
  });

  describe('isWeChat', () => {
    it('微信浏览器 UA 应返回 true', () => {
      mockUA('Mozilla/5.0 MicroMessenger/8.0.0');
      expect(device.isWeChat()).toBe(true);
    });

    it('小程序 UA 应返回 true', () => {
      mockUA('Mozilla/5.0 miniprogram');
      expect(device.isWeChat()).toBe(true);
    });

    it('普通浏览器应返回 false', () => {
      mockUA('Mozilla/5.0 (Windows NT 10.0) Chrome/120.0.0.0');
      expect(device.isWeChat()).toBe(false);
    });
  });

  describe('isWorkWeChat', () => {
    it('企业微信 UA 应返回 true', () => {
      mockUA('Mozilla/5.0 MicroMessenger/wxwork');
      expect(device.isWorkWeChat()).toBe(true);
    });

    it('普通微信应返回 false', () => {
      mockUA('Mozilla/5.0 MicroMessenger/8.0.0');
      expect(device.isWorkWeChat()).toBe(false);
    });

    it('普通浏览器应返回 false', () => {
      mockUA('Mozilla/5.0 (Windows NT 10.0) Chrome/120.0.0.0');
      expect(device.isWorkWeChat()).toBe(false);
    });
  });

  describe('getIEVersion', () => {
    it('IE 9 应返回 9', () => {
      mockUA('Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1)');
      expect(device.getIEVersion()).toBe(9);
    });

    it('IE 10 应返回 10', () => {
      mockUA('Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2)');
      expect(device.getIEVersion()).toBe(10);
    });

    it('IE 11 应返回 11', () => {
      mockUA('Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko');
      expect(device.getIEVersion()).toBe(11);
    });

    it('Edge 应返回 "Edge"', () => {
      mockUA('Mozilla/5.0 (Windows NT 10.0; Edge/12.0)');
      expect(device.getIEVersion()).toBe('Edge');
    });

    it('Chrome 应返回 -1', () => {
      mockUA('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0');
      expect(device.getIEVersion()).toBe(-1);
    });
  });
});
