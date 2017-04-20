// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import MyInteligence from './components/pages/MyInteligence'
import MyDynamicKey from './components/pages/MyDynamicKey'
import Home from './components/HelloFromVux'


Vue.use(VueRouter)

const routes = [{
  path: '/MyDynamicKey',
  component: MyDynamicKey,
  children: [
    {
        path: 'MyInteligence',
        components:MyInteligence
    }
  ]

},{
  path: '/MyInteligence',
  component: MyInteligence
}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
