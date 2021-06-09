export default{
  isPC(){
    let u = window.navigator.userAgent;
    let Agents = ['Android', 'iPhone', 'webOS', 'BlackBerry', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    let flag = true;
    for (let i = 0; i < Agents.length; i++) {
      if (u.indexOf(Agents[i]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  },
  isMobile(){
    if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
      return true;
    }
    return false;
  },
  isIos(){
    let  u  =  window.navigator.userAgent;
    let  ios  =  !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    let  iPad  =  u.indexOf('iPad')  >  -1;
    let  iPhone  =  u.indexOf('iPhone')  >  -1  ||  u.indexOf('Mac')  >  -1;
    if  (ios  ||  iPad  ||  iPhone)  {
      return true;
    } 
    else{
      return false;
    }
  },
  isAndroid(){
    let u = window.navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
      return true
    } else {
      return false
    }
  },
  isWeChat() {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger' || ua.indexOf('miniProgram') > -1) {
      return true;
    } else {
      return false;
    }
  },
  isWorkWeChat(){
    const ua = window.navigator.userAgent.toLowerCase();
    return ua.search(/MicroMessenger/i) > -1 && ua.search(/wxwork/i) > -1;
  },
  IEVersion(){
    var userAgent = navigator.userAgent;
    var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1;
    var isEdge = userAgent.indexOf('Edge') > -1 && !isIE;
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
    if(isIE) {
      var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp['$1']);
      if(fIEVersion == 7) {
          return 7;
      } else if(fIEVersion == 8) {
          return 8;
      } else if(fIEVersion == 9) {
          return 9;
      } else if(fIEVersion == 10) {
          return 10;
      } else {
          return 6;
      }   
    } else if(isEdge) {
        return 'Edge';
    } else if(isIE11) {
        return 11;
    }else{
        return -1;
    }
  }
}