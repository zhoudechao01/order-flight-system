import axios from 'axios'
import { getToken } from './setToken'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: "/api",
  timeout: 3000
})

// 设置请求拦截
service.interceptors.request.use((config) => {
  // 在发送请求前做什么
  config.headers['token'] = getToken('token')
  return config
},(error) => {
  // 对响应错误做点什么
  return Promise.reject(error)
})


// 添加响应拦截器
service.interceptors.response.use((response) => {
  // 对响应数据做些什么
  let { code } = response.data
  if (code !== 200) {
  }
  return response
}, (error) => {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default service