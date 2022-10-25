// 在项目中通常把接口请求封装成api

import service from "../utils/service.js";
import qs from 'qs'

//登录接口
export function login(data) {
  return service({
    method: 'post',
    url: '/login',
    data
  })
}

// 查询直达航班接口

export function searchNonstop(data, params) {
  return service({
    method: 'post',
    url:'/page1',
    params: params,
    data
  })
}

export function searchTransfer(data, params){
  return service({
    method: 'post',
    url: '/page2',
    params: params,
    data
  })
}

// 提交直达订单的api
export function nonstopOrder(data, params){
  return service({
    method: 'post',
    url: 'order/insert1',
    params: params,
    data
  })
}

export function transferOrder(data, params){
  return service({
    method: 'post',
    url: 'order/insert2',
    params: params,
    data
  })
}

export function getAllOrder(){
  return service({
    method: 'get',
    url: '/order/selectAll'
  })
}

export function deleteOrder(params){
  return service({
    method: 'get',
    url: '/order/deleteById',
    params
  })
}

export function getSeatData1(params){
  return service({
    method: 'get',
    url: 'seat1',
    params
  })
}

export function getSeatData2(params){
  return service({
    method: 'get',
    url: 'seat2',
    params
  })
}