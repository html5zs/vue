import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history', // 路由模式 history模式，发布服务器需要后端配合。参考地址 https://router.vuejs.org/zh/guide/essentials/history-mode.html
  routes: [
    {
      path: '/',
      name: 'home',
      component:() => import('@/views/home/home'),
      meta: {
        title: '首页'
      }
    }
  ]
})

// vue-router 全局前置守卫
router.beforeEach((to,from,next)=>{
  // token
  let token = store.state.common.userInfo.token;
  // 设置网页标题
  if(to.meta.title) {
    document.title = to.meta.title;
  }
  // 判断token是否存在
  if(token) {
    next(); // 正常跳转
  } else { // 跳转 登录页面
    if(to.path == "/login") {
      next();
    } else {
      next("/login");
    }
  }
});

export default router 