

/**
 * blobToFile
 * @param {Blob} blob
 * @param {string} fileName 文件名
 * @param {object} [fileOptions] 文件可选属性的选项对象
 * @returns
 */
export function blobToFile(blob, fileName, fileOptions) {
  const options = { type: blob.type, ...fileOptions };
  return new File([blob], fileName, options);
}

/**
 * dataURLToFile
 * @param {string} dataURL
 * @param {string} fileName 文件名
 * @param {object} [fileOptions] 文件可选属性的选项对象
 */
export function dataURLToFile(dataURL, fileName, fileOptions) {
  const blob = dataURLToBlob(dataURL);
  const options = { type: blob.type, ...fileOptions };
  return new File([blob], fileName, options);
}

/**
 * dataURLToBlob
 * @param {string} dataURL
 */
export function dataURLToBlob(dataURL) {
  const parts = dataURL.split(',');
  const mime = parts[0].match(/:(.*?);/)[1];
  const b64Data = window.atob(parts[1]);

  const byteArray = new Uint8Array(b64Data.length);
  for (let i = 0; i < b64Data.length; i++) {
    byteArray[i] = b64Data.charCodeAt(i);
  }

  return new Blob([byteArray], { type: mime });
}

/**
 * fileToDataURL
 * @param {Blob|File} blob file或者blob
 */
export function fileToDataURL(blob) {
  return blobToDataURL(blob);
}

/**
 * blobToDataURL
 * @param {Blob|File} blob file或者blob
 */
export function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const base64String = event.target?.result;
      resolve(base64String);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsDataURL(blob);
  });
}

/**
 * getDataURLMineType
 * @param {string} dataURL
 */
export function getDataURLMineType(dataURL) {
  const matches = dataURL.match(/^data:(.*);base64,/);
  if (matches && matches.length >= 2) {
    return matches[1].split('/')[1];
  }

  return null;
}
/**
 * downloadFile
 */
export function downloadFile(data, fileName, mineType) {
  // 创建 blob
  const blob = new Blob([data], { type: mineType })
  // 创建 href 超链接，点击进行下载
  window.URL = window.URL || window.webkitURL
  const href = URL.createObjectURL(blob)
  const downA = document.createElement('a')
  downA.href = href
  downA.download = fileName
  downA.click()
  // 销毁超连接
  window.URL.revokeObjectURL(href)
}
