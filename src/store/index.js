/**
 * Created by yin on 2017/7/6.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import tableMenu from './modules/content_table'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    tableMenu
  },
  strict: debug,
})
