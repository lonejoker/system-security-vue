import Cookies from "js-cookie";

const TokenKey = "Admin-Token";

// 定义token过期时间key
const timeKey = "expireTime";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function clearStorage() {
  return sessionStorage.clear();
}

/**
 * 设置token过期时间
 */
export function setTokenTime(time) {
  return sessionStorage.setItem(timeKey, time);
}

/**
 * 获取token过期时间
 */
export function getTokenTime(time) {
  return sessionStorage.getItem(timeKey);
}

/**
 * 清空token过期时间
 */
export function removeTokenTime(time) {
  return sessionStorage.setItem(timeKey, 0);
}
