import { reqGetDetails, reqPostShopCar } from '@/api/index'
import { getUUID } from '@/utils/_uuid'

const state = {
    DeailsData: {},
    //游客身份
    uuid_token: getUUID()
}

const mutations = {
    GETDETAILS(state, DeailsData) {
        state.DeailsData = DeailsData
    },
}

const actions = {
    async getDetailsData({ commit }, skuid) {
        let result = await reqGetDetails(skuid);
        if (result.code == 200) {
            commit("GETDETAILS", result.data)
        }
    },

    async addToCart({ commit }, { skuid, skuNum }) {
        let result = await reqPostShopCar(skuid, skuNum);
        if (result.code == 200) {
            return "成功"
        } else {
            return Promise.reject(new Error("失败"))
        }
    }
}

const getters = {
    categoryView(state) {
        return state.DeailsData.categoryView || {};
    },
    skuInfo() {
        return state.DeailsData.skuInfo || {};
    },
    spuSaleAttrList() {
        return state.DeailsData.spuSaleAttrList || [];
    },
    price() {
        return state.DeailsData.price;
    },
    valuesSkuJson() {
        return state.DeailsData.valuesSkuJson;
    }

}

export default {
    state,
    mutations,
    actions,
    getters,

}