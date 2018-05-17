export function jumpmaodian(id) {
  let anchorElement = document.getElementById(id);
  console.log(id,anchorElement)
  // 如果对应id的锚点存在，就跳转到锚点
  if(anchorElement) { anchorElement.scrollIntoView(); }
}

export function getParam(url, name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); //构造一个含有目标参数的正则表达式对象
  var r = (url.split('?')[1] || ' ').match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}

export function getAuthority() {
  return localStorage.getItem('userInfo');
}

export function setAuthority(data) {
  return localStorage.setItem('userInfo', JSON.stringify(data));
}

export function setMenu(data) {
  return localStorage.setItem('mymenu', JSON.stringify(data));
}

export function removeAuthority() {
  localStorage.clear();
}