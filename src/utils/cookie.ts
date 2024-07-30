import Cookies from 'js-cookie';

function setCookie(key: string, value: any, config?: any) {
  Cookies.set(key, value, config ?? {});
}

function removeCookie(key: string) {
  Cookies.remove(key);
}

function getCookieByKey(key: string) {
  return Cookies.get(key);
}

export default {
  setCookie,
  getCookieByKey,
  removeCookie,
};
