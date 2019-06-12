import {Message, Loading } from 'element-ui'
import axios from 'axios' // axios 中文说明 https://www.kancloud.cn/yunye/axios/234845
import store from '@/store'
import router from '@/router'


let loading = null; // 请求 loading

// token 过期 清除 vuex 用户信息 清除本地缓存
let invalidToken = () => {
  Message({
    message:"登录过期，请重新登录",
    type:'error',
    duration:3000,
    showClose: true,
  })

  //清空 token 和 用户信息
  store.dispatch('setUserInfo', {})

  // 清空所有缓存
  window.localStorage.clear();

  // 跳转登录页面
  router.push({
    name: 'login'
  })
}

// 动态配置 axios  baseURL  根据当前url地址,配置 api 接口。 生产或测试
let baseURL = window.location.href.indexOf('生产环境域名') !== -1 ? '生产api地址' : '测试api地址';

// 创建实例
const service = axios.create({
  baseURL: '', // 请求api地址
  timeout: 30000, // 超时时间 毫秒
  withCredentials: true // 表示跨域请求时是否需要使用凭证
})

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // loading open
    loading = Loading.service({
      lock: true,
      text: '努力加载中...',
      background: 'rgba(0,0,0,0.7)',
      target: document.querySelector('.loading-area') // 设置加载动画区域
    });

    // vuex 用户信息  token
    let token = store.state.common.userInfo.token;

    // 添加请求头
    if (token) {
      config.headers.Authorization = token;
    }

    return config
  },
  error => {
    loading.close();
    Message({
      message:'请求超时',
      type:'error',
      duration:3000,
      showClose: true,
    })
    return Promise.reject(error)
  }
)

//添加响应拦截器
service.interceptors.response.use(
  response => {
    // loading close
    loading.close();
    return response
  },
  error => {
    // loading close
    loading.close();
    Message({
      message:error.message,
      type:'error',
      duration:3000,
      showClose: true,
    })
    return Promise.reject(error)
  }
)

/* 
  @func
  @desc 后端返回数据 统一处理返回状态码，不同的状态码 执行不同的操作。
  @param {object} a.data 后端返回的数据
  @param {object} a.msg  后端返回的消息
  @param {object} a.code 后端返回的状态码
  @param {func} b Promise 成功回调
  @param {func} c Promise 失败回调
*/
let responseCode = ({data, msg, code}, resolve ,reject) => {
  // data 返回参数 msg 返回消息 code 返回状态
  switch(code) {
    // 请求成功
    case 200:
      // 成功回调
      resolve(data);
      break;
    // 请求被拦截 需要重新登录账号
    case 403:
      invalidToken();
      break;
    // 其他状态
    default:
    Message({
      message:msg,
      type:'error',
      duration:3000,
      showClose: true,
    })

    // 失败回调
    reject({
      data,
      msg,
      code,
    });
  }
}

export default {
  /* 
    @func
    @desc axios get 请求
    @param {string} a 接口地址
    @param {object} b = {} 请求参数
  */
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      service({
        method: 'get',
        url,
        params,
      }).then(({data}) => {
        responseCode(data, resolve, reject);
      }).catch(err => {
        reject(err);
        console.log(err, '异常')
      })
    })
  },
  /* 
    @func
    @desc axios post 请求
    @param {string} a 接口地址
    @param {object} b = {} 请求参数
  */
  post(url, data = {}) {
    return new Promise((resolve, reject) => {
      service({
        method: 'post',
        url,
        data,
      }).then(({data}) => {
        responseCode(data, resolve, reject);
      }).catch(err => {
        reject(err);
        console.log(err, '异常')
      })
    })
  }
}
