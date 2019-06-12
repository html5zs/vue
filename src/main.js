// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import store from './store' // vuex 中文地址 https://vuex.vuejs.org/zh/guide/
import router from './router' // vue-router 中文地址 https://router.vuejs.org/zh/
import plug from './plug' // 插件 全局指令、方法等

Vue.use(ElementUI);
Vue.use(plug);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
