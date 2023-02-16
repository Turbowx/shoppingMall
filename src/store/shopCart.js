import { reqGetShopCar, reqGetChecked, reqDeleteGoods } from '@/api/index.js'
import { Promise } from 'core-js'

const state = {
    shopCartList: [],
}
const mutations = {
    GETSHOPCART(state, shopCartList) {
        state.shopCartList = shopCartList
    }
}
const actions = {
    async getShopCart({ commit }) {
        let result = await reqGetShopCar()
        if (result.code == 200) {
            commit("GETSHOPCART", result.data)
        }
    },
    //修改勾选
    async getIsChecked({ commit }, { skuId, isChecked }) {
        let result = await reqGetChecked(skuId, isChecked)
        console.log("IsChecked", result);
    },

    async deleteGoods({ commit }, skuId) {
        let result = await reqDeleteGoods(skuId)
    },
    deleteAllGoods({ dispatch, getters }) {
        let PromiseAll = [];
        getters.shopCartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch("deleteGoods", item.skuId) : '';
            PromiseAll.push(promise)
        });

        return Promise.all(PromiseAll)

    },
    //修改全选，
    selectAll({ dispatch, state }, isChecked) {
        let promiseAll = [];
        console.log(state.shopCartList[0].cartInfoList);
        state.shopCartList[0].cartInfoList.forEach(item => {
            let promise = dispatch("getIsChecked", { skuId: item.skuId, isChecked: isChecked });
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll)
    }
}
const getters = {
    shopCartList(state) {
        return state.shopCartList[0] || {};
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}