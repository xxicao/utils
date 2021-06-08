module.exports = {
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
  isAndroid(){
    let u = window.navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
        return true
    } else {
        return false
    }
  },
  isiOS(){
    let  u  =  window.navigator.userAgent;
    let  ios  =  !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);        
    let  iPad  =  u.indexOf('iPad')  >  -1;        
    let  iPhone  =  u.indexOf('iPhone')  >  -1  ||  u.indexOf('Mac')  >  -1;        
    if  (ios  ||  iPad  ||  iPhone)  {            
        return  true;        
    } 
    else  {            
        return  false;        
    }
  },
  isWeiXin() {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger' || ua.indexOf('miniProgram') > -1) {
        return true;
    } else {
        return false;
    }
  },
}