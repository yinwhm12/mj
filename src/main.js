// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'

import 'element-ui/lib/theme-default/index.css'

import store from './store'
import auth from './auth'


// import Hello from './components/Hello.vue'
import PageMain from './components/pageMain.vue'
import Login  from  './components/login.vue'
import ContentMain  from './components/contentMain.vue'

import UpFile from './components/upFlile.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueResource)


/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })

const NotFound = {
  template: '<p>Page not found</p>'
}
const About = {
  template: '<p>about page</p>'
}

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
  },{
    path: '/login',
    component: Login
  },{
    path: '/not_found',
    component: NotFound
  },{
    path: '/upfile',
    component: UpFile
  },{
    path: '/about',
    component: About
  }]
})

Date.prototype.format = function (format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}

Vue.filter("stampToTime",(timestamp) => {
  "use strict";
  if (!timestamp){
    return ""
  }
  let newDate = new Data()
  newDate.setTime(timestamp * 1000)
  return newDate.format('yyyy-MM-dd')
})

Vue.filter("stampToTimeFull", (timestamp) => {
  "use strict";
  if (!timestamp) {
    return ""
  }
  let newDate = new Date()
  newDate.setTime(timestamp * 1000)
  return newDate.format('yyyy-MM-dd hh:mm:ss')
})

// router.beforeEach((to, from, next) => {
  // console.log("host_url",ENV.HOST_URL)
  // console.log("before----",auth.check())
  // if (to.path !== '/login' && !auth.check()) {
  //   // return a Promise that resolves to true or false
  //   next("/login")
  // } else {
  //   next()
  // }
// })

Vue.http.interceptors.push((request, next) => {
  var xtoken = sessionStorage.getItem("token")
  if (xtoken){
    request.headers.set('Authorization',xtoken)
  }
  var host = ENV.HOST_URL
  if (request.url.indexOf(host) !== 0 ){
    request.url = host + request.url
  }
  next((response) => {
    if (response.status === 401){
      router.push({path: '/login'})
    }else if(response.status !==200 ){
      let message = response.status != 0 ? response.body : "请检查网络"
      Vue.prototype.$message({
        message: message,
        type: 'warning'
      })
    }
    return response
  })
})

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})

console.log("2017-07-04 17:02")
/******/

