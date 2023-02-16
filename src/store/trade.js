import {reqGetUserAddress,reqOrderData} from '@/api/index'

const state = {
    addresses:[],
    orderInfo:{},
}
const mutations = {
    GETUSERADDRESS(state,addresses){
        state.addresses = addresses
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    }
}
const actions = {
    //获取地址信息
    async getUserAddress({commit}){
        let res = await reqGetUserAddress();
        console.log("地址",res);
        if(res.code == 200){
            commit("GETUSERADDRESS",res.data)
        }
    },
    //获取交易订单信息
    async getOrderInfo({commit}){
        let res = await reqOrderData()
        console.log("订单页信息",res);
        if(res.code){
            commit("GETORDERINFO",res.data)
        }
    }
}
const getters = {
    // orderDetailList(state){
    //     return state.orderInfo.orderDetailVoList[0].orderDetailList || [];
    // }
}

export default {
    state,
    mutations,
    actions,
    getters
}