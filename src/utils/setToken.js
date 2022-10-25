// 存放设置token的文件
// 第一个参数为token的名字，第二个参数为token的值
export function setToken(tokenKey, token){
  return localStorage.setItem(tokenKey, token)
}

export function getToken(tokenKey){
  return localStorage.getItem(tokenKey)
}

export function removeToken(tokenKey){
  return localStorage.removeItem(tokenKey)
}