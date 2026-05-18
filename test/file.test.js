import {
  blobToFile,
  dataURLToBlob,
  dataURLToFile,
  blobToDataURL,
  fileToDataURL,
  getDataURLMimeType,
  downloadFile,
} from '../src/modules/file';

describe('file 模块', () => {
  const textDataURL = 'data:text/plain;base64,SGVsbG8gV29ybGQ=';
  const pngDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

  describe('dataURLToBlob', () => {
    it('应将 DataURL 转为 Blob', () => {
      const blob = dataURLToBlob(textDataURL);
      expect(blob).toBeInstanceOf(Blob);
      expect(blob.type).toBe('text/plain');
    });

    it('应保留正确的 MIME 类型', () => {
      const blob = dataURLToBlob(pngDataURL);
      expect(blob.type).toBe('image/png');
    });
  });

  describe('blobToFile', () => {
    it('应将 Blob 转为 File', () => {
      const blob = new Blob(['hello'], { type: 'text/plain' });
      const file = blobToFile(blob, 'test.txt');
      expect(file).toBeInstanceOf(File);
      expect(file.name).toBe('test.txt');
      expect(file.type).toBe('text/plain');
    });

    it('应支持额外 options', () => {
      const blob = new Blob(['hello'], { type: 'text/plain' });
      const file = blobToFile(blob, 'test.txt', { lastModified: 1234567890 });
      expect(file.lastModified).toBe(1234567890);
    });
  });

  describe('dataURLToFile', () => {
    it('应将 DataURL 转为 File', () => {
      const file = dataURLToFile(textDataURL, 'hello.txt');
      expect(file).toBeInstanceOf(File);
      expect(file.name).toBe('hello.txt');
      expect(file.type).toBe('text/plain');
    });
  });

  describe('blobToDataURL', () => {
    it('应将 Blob 转为 DataURL', async () => {
      const blob = new Blob(['hello'], { type: 'text/plain' });
      const dataURL = await blobToDataURL(blob);
      expect(dataURL).toMatch(/^data:text\/plain;base64,/);
    });
  });

  describe('fileToDataURL', () => {
    it('应将 File 转为 DataURL', async () => {
      const file = new File(['hello'], 'test.txt', { type: 'text/plain' });
      const dataURL = await fileToDataURL(file);
      expect(dataURL).toMatch(/^data:text\/plain;base64,/);
    });
  });

  describe('getDataURLMimeType', () => {
    it('应正确提取 MIME 子类型', () => {
      expect(getDataURLMimeType(textDataURL)).toBe('plain');
      expect(getDataURLMimeType(pngDataURL)).toBe('png');
    });

    it('无效 DataURL 应返回 null', () => {
      expect(getDataURLMimeType('not-a-dataurl')).toBeNull();
    });

    it('空字符串应返回 null', () => {
      expect(getDataURLMimeType('')).toBeNull();
    });
  });

  describe('downloadFile', () => {
    it('应创建下载链接并触发点击', () => {
      // jsdom 不支持 URL.createObjectURL，需要 mock
      const mockCreateObjectURL = vi.fn(() => 'blob:mock-url');
      const mockRevokeObjectURL = vi.fn();
      window.URL = {
        createObjectURL: mockCreateObjectURL,
        revokeObjectURL: mockRevokeObjectURL,
      };
      const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click');
      downloadFile('hello', 'test.txt', 'text/plain');
      expect(mockCreateObjectURL).toHaveBeenCalled();
      expect(clickSpy).toHaveBeenCalled();
      clickSpy.mockRestore();
    });
  });
});
