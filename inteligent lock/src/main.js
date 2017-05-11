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


import cs from './components/pages/cs'

// import Home from './components/HelloFromVux'

import rem from './assets/lib/flexible.js'

Vue.use(VueRouter)

const routes = [
    {
      path:'/',
      meta: {title: 'MyDynamicKey'},
      // component: MyInteligence
      component: cs
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
      component: MyInteligence
    },
    {
      path: '/V201_SYSTEMSECRET',
      component: MyDynamicKey
    },
    { path: '*', component: MyInteligence},
]

const router = new VueRouter({
  routes
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
