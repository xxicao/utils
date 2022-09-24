### Mthods
#### UA
- isPC：检测是否PC
- isMobile：检测是否移动端
- isIos：检测是否苹果
- isAndroid：检测是否安卓
- isWeChat：检测是否微信浏览器
- isWorkWeChat：检测是否企业微信浏览器
- IEVersion：检测IE浏览器版本，非IE返回-1，Edge返回'Edge'

#### Cookie
- setCookie(name,value,?day)：设置Cookie，day默认30天
- getCookie(name)：读取Cookie
- deleteCookie(name)：删除Cookie

#### Utils
- bigNumberAdd(string,string)：大数相加
- filterXSS(string)：文本标签转义
- dateFormat(timestamp, ?format)：日期格式化'yyyy-MM-dd hh:mm:ss'
- debounce(fn, delay)：防抖，delay默认300
- throttle(fn, interval)：节流，interval默认300
- preloadImage(url)：预加载Image
- injectScript(src)：动态注入JS
- injectCss(src)：动态注入CSS
- fullScreen(DOM)：进入全屏
- exitFullScreen(DOM)：退出全屏

### Usage
#### import
```javascript
npm install @xxicao/utils

import utils from '@xxicao/utils';
console.log(utils)
```
#### script
```javascript
<script src='dist/bundle.min.js'></script>
<script>
  console.log(utils)
</script>
```
