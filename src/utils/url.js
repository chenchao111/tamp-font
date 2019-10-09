/**
 * 本文件用来处理url
 */
export const getQueryString = name => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
};
export const queryUrl = (url = window.location.href) => {
  const reg = /([^#$?&]+)=([^#$?&]+)/g;
  const obj = {};
  url.replace(reg, (item, attr, val) => {
    obj[attr] = val;
  });
  return obj;
};
