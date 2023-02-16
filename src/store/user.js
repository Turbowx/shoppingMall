import { reqGetCode, reqPostRegister, reqPostLogin, reqGetUserInfo, reqGetLoginOut } from '@/api/index.js'
import { setToken, getToken,removeToken } from '@/utils/token'
const state = {
    codeData: '',
    token: getToken(),
    userInfo: {},
}

const mutations = {
    GETCODE(state, codeData) {
        state.codeData = codeData
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO0(state, userinfo) {
        state.userInfo = userinfo;
    },
    CLEARALL(state){
        state.token = ""
        state.userInfo = {}
        removeToken()
    }
}

const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit("GETCODE", result.data)
        }
    },
    //注册
    async postRegister({ commit }, user) {
        let result = await reqPostRegister(user)
        console.log("注册", result);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    //登录
    async userlogin({ commit }, user) {
        let result = await reqPostLogin(user);
        console.log("登录", result);
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token);
            //持久化存储token
            setToken(result.data.token)
            return "ok";
        } else {
            return Promise.reject(new Error("失败"))
        }
    },

    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqGetUserInfo()
        console.log("用户信息", result);
        if (result.code == 200) {
            commit("GETUSERINFO0", result.data)
            return "成功"
        }else{
            return Promise.reject(new Error(result.message))
        }
    },

    //退出登录
    async LoginOut({commit}){
        let result = await reqGetLoginOut();
        console.log("退出登录",result);
        if(result.code == 200){
            commit("CLEARALL")
            return "ok";
        }else{
            return Promise.reject(new Error(result.message))
        }
    }


}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}