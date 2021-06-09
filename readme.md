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
- getQuery(name,?search)：获取search的查询参数，search默认location.search
- bigNumberAdd(string,string)：大数相加
- filterXSS(string)：文本标签转义
- dateFormat(formatStr,?Date)：日期格式化，formatStr：'yyyy-MM-dd hh:mm:ss'，Date默认当前时间
- debounce(fn, delay)：防抖，delay默认300
- throttle(fn, interval)：节流，interval默认300

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
