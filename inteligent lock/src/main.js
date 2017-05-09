// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import API from './api/api.js'
var api = new API()

import MyInteligence from './components/pages/MyInteligence'
import MyDynamicKey from './components/pages/MyDynamicKey'
import MyKeyManagement from './components/pages/MyKeyManagement'
import MyResentUse from './components/pages/MyResentUse'
import MyHistory from './components/MyHistory'
import MyUserList from './components/MyUserList'
import GatewayManager from './components/pages/GatewayManager'

// import { WechatPlugin } from 'vux'


import cs from './components/pages/cs'

// import Home from './components/HelloFromVux'

import rem from './assets/lib/flexible.js'

Vue.use(VueRouter)
// Vue.use(WechatPlugin)


// var timestamp = window.localStorage.getItem("timestamp")
// var signature = window.localStorage.getItem("signature")
// var nonceStr = window.localStorage.getItem("nonceStr")
// console.log(appId,timestamp,signature,nonceStr)
// Vue.wechat.config({
//   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//   appId: appId, // 必填，公众号的唯一标识
//   timestamp: timestamp , // 必填，生成签名的时间戳
//   nonceStr:  nonceStr, // 必填，生成签名的随机串
//   signature:  signature,// 必填，签名，见附录1
//   jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
// })

const routes = [
    {
      path:'/',
      meta: {title: 'MyDynamicKey'},
      component: MyInteligence
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
      path: '/:id/V201_SMART',
      component: MyInteligence
    },
    {
      path: '/:id/V201_SYSTEMSECRET',
      component: MyDynamicKey
    },
    { path: '*', component: cs},
]

const router = new VueRouter({
  routes
})

router.beforeEach(function (to,from,next) {

    if (to.meta.title) {
        document.title = to.meta.title;
        console.log( document.title)
    }

    next();
});

router.afterEach(function (to,from) {

  var path = window.location.href.split('#')[0];
  var appId = window.localStorage.getItem("appId");

  api.post("wechatedit/jsConfig",{
    appId:appId,
    url:path
  })
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })


})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  created: function(){
     router.replace({path: window.localStorage.getItem("order")})
  },
  render: h => h(App)
}).$mount('#app-box')
