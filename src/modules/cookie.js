module.exports = {
  setCookie(name,value,day){
    let Days = day || 30;
    let exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + '='+ escape (value) + ';expires=' + exp.toGMTString();
  },
  getCookie(name){
    var cname = name + '=';
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++){
      var c = ca[i].trim();
      if (c.indexOf(cname)==0) return c.substring(cname.length,c.length);
    }
    return '';
  },
  deleteCookie(name){
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    document.cookie = name + '=null;expires=' + exp.toGMTString();
  },
}