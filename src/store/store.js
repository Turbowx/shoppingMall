import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex);

import home from '@/pages/Home/home'
import search from "@/pages/Search/search";
import details from '@/store/details'
import shopCart from "@/store/shopCart";
import user from '@/store/user'
import trade from '@/store/trade'

export default new Vuex.Store({
    modules: {
        home,
        search,
        details,
        shopCart,
        user,
        trade
    }
})