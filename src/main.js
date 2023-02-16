import Vue from 'vue'
import App from './App.vue'
//三级联动组件====全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
//注册轮播图为全局组件
import Carousel from '@/components/Carousel/Carousel.vue'
Vue.component(Carousel.name, Carousel)
//注册分页器
import Pagination from '@/components/Pagination/Pagination.vue'
Vue.component(Pagination.name, Pagination)
//路由
import router from './router/router'
//Vuex
import store from '@/store/store'
//引入请求方法
import * as API from '@/api/index'
//引入elementUI 按需
import {Button, Dialog, MessageBox } from 'element-ui'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.use(Dialog);
Vue.use(Button)

import '@/mock/morkServer'    //引入mock模拟数据的服务
import 'swiper/css/swiper.css'    //引入swiper的css文件


import VueLazyload from 'vue-lazyload'
import pkq from '@/assets/pkq.gif'
Vue.use(VueLazyload,{
  //默认图片
  loading:pkq
})

import '@/plugins/validate.js'

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  store,

}).$mount('#app')
