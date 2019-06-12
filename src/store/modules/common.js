
const common = {
  state: {
    userInfo: {
      token: 'token'
    }, // 用户信息
  },
  getters: {
    
  },
  actions: {
    // 保存用户信息
    setUserInfo:({commit},userInfo) => {
      commit('SETUSERINFO',userInfo);
    }
  },
  mutations: {
    SETUSERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
    }
  }
}

export default common