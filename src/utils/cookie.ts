import _ from 'lodash';
import Cookies, { CookieAttributes } from 'js-cookie';
import { authKey } from '@constants/cookieKey';
import { JwtPayload, jwtDecode } from 'jwt-decode';

function _getCookieAttribute(config: any): CookieAttributes {
  const newConfig: CookieAttributes = {
    path: '/',
    // domain: document.location.hostname,
    secure: import.meta.env.PROD,
  };
  if (config?.expires) {
    newConfig.expires = new Date(config?.expires * 1000);
  }
  return newConfig;
}

function parseBodyToken(token: string) {
  return JSON.parse(atob(_.split(token, '.')[1]));
}

function setCookie(key: string, value: any, config?: any) {
  Cookies.set(key, value, config ?? {});
}

function removeCookie(key: string) {
  Cookies.remove(key);
}

function getAuthToken() {
  const authToken = Cookies.get(authKey.TOKEN_KEY);
  const refreshToken = Cookies.get(authKey.REFRESH_TOKEN_KEY);
  if (_.isEmpty(authToken) || _.isEmpty(refreshToken)) {
    return {};
  }
  return {
    authToken,
    refreshToken,
  };
}

function getCookieByKey(key: string) {
  return Cookies.get(key);
}

function setAuthToken(data: any) {
  const authToken = parseBodyToken(data.accessToken);
  const refreshToken = parseBodyToken(data.refreshToken);
  Cookies.set(authKey.TOKEN_KEY, data.accessToken, _getCookieAttribute({ expires: authToken.exp }));
  Cookies.set(authKey.REFRESH_TOKEN_KEY, data.refreshToken, _getCookieAttribute({ expires: refreshToken.exp }));
}

function removeAuthToken() {
  Cookies.remove(authKey.TOKEN_KEY);
  Cookies.remove(authKey.REFRESH_TOKEN_KEY);
}

const getAccountInfoFromToken = () => {
  const data = getAuthToken();
  const authToken = _.get(data, 'authToken', '');
  const decoded = jwtDecode<JwtPayload>(authToken);
  const subAcctNo: any[] = _.get(decoded, 'subAcctNo', []);
  return subAcctNo.sort((a, _b) => (a.accType === 'C' ? -1 : 1));
};

export default {
  setCookie,
  getCookieByKey,
  removeCookie,
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  getAccountInfoFromToken,
};
