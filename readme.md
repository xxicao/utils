### Mthods
#### UA
- isPC：检测是否PC
- isiOS：检测是否苹果
- isAndroid：检测是否安卓
- isWeiXin：检测是否微信浏览器

#### Cookie
- setCookie(name,value,?day)：设置Cookie
- getCookie(name)：读取Cookie
- deleteCookie(name)：删除Cookie

#### Utils
- bigNumberAdd(string,string)：大数相
- filterXSS(string)：文本标签过滤
- dateFormat('yyyy-MM-dd hh:mm:ss',?Date)：日期格式化
- getRandomKey(length)：获取指定长度随机字符串

### Usage
```
npm install @xxicao/utils

import utils from '@xxicao/utils';
console.log(utils)
```
