# @xxicao/utils

前端常用工具方法库，轻量、零依赖（除 events），开箱即用。

## 安装

```bash
npm install @xxicao/utils
```

## 使用

### ES Module

```javascript
import utils from '@xxicao/utils';

// 示例
utils.formatDate(Date.now(), '{y}-{m}-{d} {h}:{i}:{s}');
utils.setLocal('key', { name: 'test' });
utils.debounce(fn, 300);
utils.generateUUID();
utils.copyToClipboard('hello world');
```

### Script 标签

```html
<script src="dist/bundle.min.js"></script>
<script>
  console.log(utils.formatDate(Date.now()));
</script>
```

## API 文档

### Cookie

| 方法 | 说明 | 参数 |
|------|------|------|
| `setCookie(name, value, days?, path?)` | 设置 Cookie，默认 30 天 | `days` 可选天数，`path` 可选路径默认 `/` |
| `getCookie(name)` | 读取 Cookie | - |
| `deleteCookie(name, path?)` | 删除 Cookie | `path` 需与设置时一致 |

### Date

| 方法 | 说明 | 参数 |
|------|------|------|
| `formatDate(timestamp, format?)` | 时间戳格式化，默认 `'{y}-{m}-{d}'` | 支持 `{y}{m}{d}{h}{i}{s}{a}` |
| `timeAgo(timestamp)` | 时间距离描述（如"3分钟前"） | 毫秒时间戳 |

### Device

| 方法 | 说明 | 返回值 |
|------|------|--------|
| `isPC()` | 检测是否 PC 端 | `boolean` |
| `isMobile()` | 检测是否移动端 | `boolean` |
| `isIOS()` | 检测是否 iOS | `boolean` |
| `isAndroid()` | 检测是否 Android | `boolean` |
| `isWeChat()` | 检测是否微信浏览器 | `boolean` |
| `isWorkWeChat()` | 检测是否企业微信 | `boolean` |
| `getIEVersion()` | 获取 IE 版本 | `number` / `'Edge'` / `-1` |

### Dom

| 方法 | 说明 |
|------|------|
| `preloadImage(url)` | 预加载图片，返回 `Promise` |
| `injectScript(src)` | 动态注入 JS 脚本，返回 `Promise` |
| `injectCss(href)` | 动态注入 CSS 样式，返回 `Promise` |
| `fullscreen(element)` | 元素进入全屏 |
| `exitFullscreen()` | 退出全屏 |
| `copyToClipboard(text)` | 复制文本到剪贴板，优先 Clipboard API，降级 execCommand，返回 `Promise<boolean>` |
| `scrollToTop(duration?)` | 平滑滚动到页面顶部，默认 300ms |
| `addClass(element, className)` | 为元素添加 class |
| `removeClass(element, className)` | 为元素移除 class |
| `getScrollPosition()` | 获取页面滚动位置，返回 `{x: number, y: number}` |

### Events

| 方法 | 说明 |
|------|------|
| `EventEmitter` | 事件总线，同 Node.js [events](https://nodejs.org/api/events.html) 模块用法 |

### File

| 方法 | 说明 |
|------|------|
| `blobToFile(blob, fileName, options?)` | Blob → File |
| `dataURLToFile(dataURL, fileName, options?)` | DataURL → File |
| `dataURLToBlob(dataURL)` | DataURL → Blob |
| `fileToDataURL(blob)` | File → DataURL |
| `blobToDataURL(blob)` | Blob → DataURL |
| `getDataURLMimeType(dataURL)` | 获取 MIME 类型 |
| `downloadFile(data, fileName, mimeType)` | 前端下载文件 |

### Fn

| 方法 | 说明 | 参数 |
|------|------|------|
| `debounce(fn, delay?)` | 防抖，默认 300ms | - |
| `throttle(fn, interval?)` | 节流，默认 300ms | - |
| `curry(fn, collectedArgs?)` | 函数柯里化 | - |
| `sleep(delay?)` | 睡眠函数，默认 1000ms | 返回 `Promise` |
| `retry(fn, retries?, interval?)` | 异步重试，默认 3 次 / 1000ms | 返回 `Promise` |
| `once(fn)` | 只执行一次 | - |

### Number

| 方法 | 说明 | 返回值 |
|------|------|--------|
| `padZero(num, length?)` | 数字补零，默认补 2 位 | `string` |
| `clamp(value, min, max)` | 限制数字在指定范围内 | `number` |
| `randomInt(min, max)` | 生成范围内随机整数（含边界） | `number` |
| `formatPercent(value, total?, digits?)` | 格式化百分比，默认总数 1，保留 2 位 | `string` |
| `addLargeNumbers(a, b)` | 大数相加（避免精度丢失） | `string` / `undefined` |
| `formatMoney(amount, decimalDigits?)` | 金额千分位格式化，默认保留 2 位小数 | `string` |

### Object

| 方法 | 说明 | 返回值 |
|------|------|--------|
| `deepClone(source)` | 深拷贝对象/数组/Date/RegExp | 拷贝后的值 |

### Storage

| 方法 | 说明 |
|------|------|
| `setLocal(key, value)` | 设置 localStorage（自动 JSON 序列化） |
| `getLocal(key)` | 读取 localStorage（自动 JSON 反序列化） |
| `removeLocal(key)` | 删除 localStorage |
| `clearLocal()` | 清空 localStorage |
| `setSession(key, value)` | 设置 sessionStorage |
| `getSession(key)` | 读取 sessionStorage |
| `removeSession(key)` | 删除 sessionStorage |
| `clearSession()` | 清空 sessionStorage |

### String

| 方法 | 说明 | 返回值 |
|------|------|--------|
| `sanitizeXSS(str)` | XSS 标签净化转义 | `string` |
| `randomString(length?)` | 生成随机字符串，默认 32 位 | `string` |
| `generateUUID()` | 生成 UUID v4 | `string` |

### Type

| 方法 | 说明 | 返回值 |
|------|------|--------|
| `isDef(val)` | 是否有值（排除 `undefined` 和 `null`） | `boolean` |
| `is(val, type)` | 判断数据类型 | `boolean` |
| `isString(val)` | 是否字符串 | `boolean` |
| `isNumber(val)` | 是否数字 | `boolean` |
| `isObject(val)` | 是否对象 | `boolean` |
| `isArray(val)` | 是否数组 | `boolean` |
| `isFunction(val)` | 是否函数 | `boolean` |
| `isBoolean(val)` | 是否布尔值 | `boolean` |
| `isPlainObject(val)` | 是否纯对象 | `boolean` |
| `isEmpty(val)` | 是否为空（空字符串/空数组/空对象/null/undefined） | `boolean` |
| `isPromise(val)` | 是否 Promise 对象 | `boolean` |
| `isEmail(email)` | 邮箱格式校验 | `boolean` |

### Mask

| 方法 | 说明 | 返回值 |
|------|------|--------|
| `maskPhone(phone)` | 手机号脱敏（中间4位\*号） | `string` |
| `idCardMask(idCard)` | 身份证号脱敏 | `string` |

### Url

| 方法 | 说明 | 返回值 |
|------|------|--------|
| `buildQueryString(params)` | 对象转查询字符串，自动过滤空值 | `string` |
| `getUrlParam(name, url?)` | 获取 URL 指定参数值 | `string` / `null` |
| `parseQueryString(url?)` | 解析 URL 查询参数为对象 | `Object` |
| `isExternalLink(url)` | 判断是否外部链接（http/https） | `boolean` |
| `updateUrlParams(params)` | 更新 URL 参数（不刷新页面） | - |
| `getBaseUrl(url?)` | 获取基础 URL（去查询参数和哈希） | `string` |

## 开发

```bash
# 安装依赖
npm install

# 构建
npm run build

# 监听模式
npm run watch

# 单元测试
npm test

# ESLint 检查
npm run lint

# ESLint 修复
npm run lintfix
```

## License

[MIT](./LICENSE)
