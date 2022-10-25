import { getToken } from '@/utils/setToken'
import Vue from 'vue'
import Router from 'vue-router'

var isCommon = true
if(getToken('username') === 'admin')
{
  isCommon = false
}

Vue.use(Router)

export default new Router({
    routes: [
        {
          path: '/',
          name: '首页',
          redirect: '/login',
          hidden: true,
          component: () => import('../components/Login.vue')
        },
        {
          path: '/login',
          name: '登录页',
          hidden: true,
          component: () => import('../components/Login.vue')
        },
        {
          path: '/home',
          name: '航班信息',
          redirect: '/home/flightList',
          component: () => import('../components/Home.vue'),
          children: [
            {
              path: '/home/flightList',
              name: '航班列表',
              component: () => import('../components/FlightMessage/FlightList.vue')
            },
            {
              path: '/home/flightDetail',
              name: '航班详情',
              hidden: true,
              component: () => import('../components/FlightMessage/FlightDetail.vue')
            }
          ]
        },
        {
          path: '/home',
          name: '订单信息',
          component: () => import('../components/Home.vue'),
          children: [
            {
              path: '/home/orderList',
              name: '订单列表',
              component: () => import('../components/Order/OrderList.vue')
            },
            {
              path: '/home/orderDetail',
              name: '订单详情',
              hidden: true,
              component: () => import('../components/Order/OrderDetail.vue')
            }
          ]
        },
        {
          path: '/home',
          name: '航班管理',
          isCommon: isCommon,
          component: () => import('../components/Home.vue'),
          children: [
            {
              path: '/home/management',
              name: '航班设置',
              component: () => import('../components/Management/Management.vue')
            },
          ]
        },
    ],
    mode: 'history'
})