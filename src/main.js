// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-default/index.css'

import store from './store'

// import Hello from './components/Hello.vue'
import PageMain from './components/pageMain.vue'
import Login  from  './components/login.vue'
import ContentMain  from './components/contentMain.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI)


/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })

export var router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [{
    path: '/home',
    // name: 'pageMain',
    component: PageMain,
    children: [
      {
        name: 'content',
        path: 'content',
        component: ContentMain,
      }
    ]
  }]
})

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})

console.log("2017-07-04 17:02")
/******/

