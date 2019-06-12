import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate" // 解决刷新,vuex数据丢失
import common from './modules/common'// 公共的

Vue.use(Vuex)

const store = new Vuex.Store({
  // 解决F5刷新页面vuex数据丢失问题
  plugins: [createPersistedState({ 
      storage: window.localStorage
  })],
  modules: { // vuex 模块化
    common
  }
})

export default store
