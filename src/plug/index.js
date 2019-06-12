import axios from '@/api' // 封装的 axios 数据交互
import moment from 'moment' // 日期格式化

/* 
  @func
  @desc 日期格式化
  @param {number} a 时间戳
  @param {string} b 格式
*/
let formatDate = (time, type) => {
  let date = '';

  // 如果传入无效的时间 返回空
  if (!time) {
    return date
  }
  switch(type) {
    // 年月日时分秒
    case 'YYYY-MM-DD HH:mm:ss':
      date = moment(time).format('YYYY-MM-DD HH:mm:ss');
      break;
    // 年月日
    case 'YYYY-MM-DD':
      date = moment(time).format('YYYY-MM-DD');
      break;
      // 时分秒
    case 'HH:mm:ss':
    date = moment(time).format('HH:mm:ss');
    break;
    default:
      console.error('vue-format-date 指令参数type格式错误 YYYY-MM-DD HH:mm:ss 或 YYYY-MM-DD')
  }
  return date;
}

//添加 全局的 指令 过滤器 实例方法等
export default {
  install(Vue, options) {
    // 添加全局过滤器 格式化日期
    Vue.filter('formatDate', function(time, type) {
      return formatDate(time ,type)
    })

    // 添加实例方法 ajax 数据交互
    Vue.prototype.$axios = axios;
  }
}
