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


new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})

console.log("2017-07-04 17:02")
/******/

