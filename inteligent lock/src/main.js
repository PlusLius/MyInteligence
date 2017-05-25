// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import API from './api/api.js'
import VueScroller from 'vue-scroller'
import { WechatPlugin } from 'vux'
Vue.use(VueScroller)
var api = new API()

import MyInteligence from './components/pages/MyInteligence'
import MyDynamicKey from './components/pages/MyDynamicKey'
// import MyKeyManagement from './components/pages/MyKeyManagement'
// import MyResentUse from './components/pages/MyResentUse'
// import MyHistory from './components/MyHistory'
// import MyUserList from './components/MyUserList'
// import GatewayManager from './components/pages/GatewayManager'


// const MyInteligence = resolve => {require(['./components/pages/MyInteligence'],resolve)}
// const MyDynamicKey = resolve => {require(['./components/pages/MyDynamicKey'],resolve)}
const MyKeyManagement = resolve => {require(['./components/pages/MyKeyManagement'],resolve)}
const MyResentUse = resolve => {require(['./components/pages/MyResentUse'],resolve)}
const MyHistory = resolve => {require(['./components/MyHistory'],resolve)}
const MyUserList = resolve => {require(['./components/MyUserList'],resolve)}
const GatewayManager = resolve => {require(['./components/pages/GatewayManager'],resolve)}



import cs from './components/pages/cs'

// import Home from './components/HelloFromVux'

import rem from './assets/lib/flexible.js'

Vue.use(VueRouter)
Vue.use(WechatPlugin)

 function GetQueryString(name) {
         var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         // if (r != null)return unescape(r[2]);
         if (r != null){
             return r[2];
         }
         return null;
      }
 var code = GetQueryString("code");
 var state =  GetQueryString("state");
 var appId = state.split("-")[0]
 var order = state.split("-")[1]
 var href = window.location.href.split('#')[0];
 var qs = require('qs');
  api.postAPI("wechatedit/auth",qs.stringify({
    code:code,
    url:href,
    appId:appId
  }))
  .then( data => {
        sessionStorage.setItem("token", "jwt"+data.data.data.token);
        sessionStorage.setItem("order", order);



        Vue.wechat.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId:appId, // 必填，公众号的唯一标识
            timestamp: data.data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.data.data.nonceStr, // 必填，生成签名的随机串
            signature: data.data.data.signature,// 必填，签名，见附录1
            jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
          new Vue({
            router,
            created (){
              // var order = sessionStorage.getItem("order");
              // if(order == "V201_SMART" && window.localStorage.getItem("gatewayLockId")){
              //     router.replace({path:"/MyResentUse/MyHistory"})
              // } else {
                // router.replace({path: order})
              // }

            },
            render: h => h(App)
          }).$mount('#app-box')
      })
      .catch( err => {
        console.log(err)
     })

const routes = [
    {
      path:'/',
      meta: {title: '我的智能'},
      // component: MyDynamicKey
      component: MyInteligence,
      // component: cs
    },
    {
      path: '/MyDynamicKey',
      meta: {title: 'MyDynamicKey'},
      component: MyDynamicKey
    },
    {
      path: '/MyDynamicKey/MyKeyManagement',
      meta: {title: 'MyKeyManagement'},
      component: MyKeyManagement
    },
    {
      path: '/MyResentUse',
      component:MyResentUse,
      children: [
        {
          path: 'MyHistory',
          component:MyHistory
        },
        {
          path: 'MyUserList',
          component:MyUserList
        }
      ]
    },
    {
      path: '/MyInteligence',
      component: MyInteligence
    },
    {
      path: '/MyInteligence/GatewayManager',
      component: GatewayManager
    },
    {
      path: '/V201_SMART',
      component: MyInteligence,
      beforeEnter: (to, from, next) => {
        if(window.localStorage.getItem("currentUserId")){
           next("/MyResentUse/MyHistory");
        }
        else{
          next("/MyInteligence");
        }
      }
    },
    {
      path: '/V201_SYSTEMSECRET',
      component: MyDynamicKey
    },
    { path: '*', component: MyInteligence},
    // { path: '*', component: MyDynamicKey},
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
  // alert(to.meta.pageTitle)
//   document.title = from.meta.title;
//   next();
// })

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   router,
//   created: function(){
//     // if(window.localStorage.getItem("gatewayLockId")) {
//     //   router.replace({path:"/MyResentUse/MyHistory"})
//     //  }
//      router.replace({path: window.localStorage.getItem("order")})
//   },
//   render: h => h(App)
// }).$mount('#app-box')
