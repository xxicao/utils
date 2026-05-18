/**
 * @module file
 * @description 文件与数据转换：Blob/File/DataURL 互转、MIME 类型获取、前端下载
 */

/**
 * Blob 转 File
 * @param {Blob} blob
 * @param {string} fileName 文件名
 * @param {object} [options] 文件可选属性
 * @returns {File}
 */
export function blobToFile(blob, fileName, options) {
  const fileOptions = { type: blob.type, ...options };
  return new File([blob], fileName, fileOptions);
}

/**
 * DataURL 转 File
 * @param {string} dataURL
 * @param {string} fileName 文件名
 * @param {object} [options] 文件可选属性
 * @returns {File}
 */
export function dataURLToFile(dataURL, fileName, options) {
  const blob = dataURLToBlob(dataURL);
  const fileOptions = { type: blob.type, ...options };
  return new File([blob], fileName, fileOptions);
}

/**
 * DataURL 转 Blob
 * @param {string} dataURL
 * @returns {Blob}
 */
export function dataURLToBlob(dataURL) {
  const parts = dataURL.split(',');
  const mimeType = parts[0].match(/:(.*?);/)[1];
  const base64Str = window.atob(parts[1]);

  const byteArray = new Uint8Array(base64Str.length);
  for (let i = 0; i < base64Str.length; i++) {
    byteArray[i] = base64Str.charCodeAt(i);
  }

  return new Blob([byteArray], { type: mimeType });
}

/**
 * File 转 DataURL
 * @param {Blob|File} blob
 * @returns {Promise<string>}
 */
export function fileToDataURL(blob) {
  return blobToDataURL(blob);
}

/**
 * Blob 转 DataURL
 * @param {Blob|File} blob
 * @returns {Promise<string>}
 */
export function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      resolve(event.target.result);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsDataURL(blob);
  });
}

/**
 * 获取 DataURL 的 MIME 类型
 * @param {string} dataURL
 * @returns {string|null}
 */
export function getDataURLMimeType(dataURL) {
  const matches = dataURL.match(/^data:(.*);base64,/);
  if (matches && matches.length >= 2) {
    return matches[1].split('/')[1];
  }

  return null;
}

/**
 * 前端下载文件
 * @param {*} data 文件数据
 * @param {string} fileName 文件名
 * @param {string} mimeType MIME 类型
 */
export function downloadFile(data, fileName, mimeType) {
  const blob = new Blob([data], { type: mimeType });
  const URL = window.URL || window.webkitURL;
  const href = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // 延迟释放，确保下载已启动
  setTimeout(() => URL.revokeObjectURL(href), 100);
}
