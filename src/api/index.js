//当前这个模块:API进行统一管理
import axios from './axios.js'

import mock from './mock.js'


//api/product/getBasecategoryList get无参数
export function getList() {
    return axios({ url: '/product/getBaseCategoryList', method: 'get' })
};

//搜索商品 /api/list post方法 参数：json格式
/*
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
} */
export function reqPostSearchInfo(params) {
    return axios({ url: '/list', method: 'post', data: params })
};

//获取详情页    /api/item/{ skuId }  get  skuid必填
export function reqGetDetails(skuid) {
    return axios({ url: `/item/${skuid}`, method: 'get' })
}
//添加购物车  /api/cart/addToCart/{ skuId }/{ skuNum }  post
export function reqPostShopCar(skuId, skuNum) {
    return axios({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
}
//获取购物车列表 /api/cart/cartList get
export function reqGetShopCar() {
    return axios({ url: '/cart/cartList', method: 'get' })
}
//切换选中商品状态 /api/cart/checkCart/{skuID}/{isChecked}  get  skuID  isChecked
export function reqGetChecked(skuId, isChecked) {
    return axios({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
}
//删除商品  /api/cart/deleteCart/{skuId}   DELETE   skuId
export function reqDeleteGoods(skuId) {
    return axios({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' })
}
//获取验证码   /api/user/passport/sendCode/{phone}   get    
export function reqGetCode(phone) {
    return axios({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
}
//注册用户   /api/user/passport/register   post   {phone,password,code}
export function reqPostRegister(data) {
    return axios({ url: `/user/passport/register`, data, method: 'post' })
}
//登录  /api/user/passport/login    post  {phone,password}
export function reqPostLogin(data) {
    return axios({ url: `/user/passport/login`, data, method: 'post' })
}   
//根据用户token向服务器要用户信息   /api/user/passport/auth/getUserInfo  
export function reqGetUserInfo() {
    return axios({ url: '/user/passport/auth/getUserInfo',  method: 'get' })
}
//退出登录  /api/user/passport/logout  get 无参
export function reqGetLoginOut() {
    return axios({ url: '/user/passport/logout',  method: 'get' })
}
//获取用户地址  /api/user/userAddress/auth/findUserAddressList
export function reqGetUserAddress() {
    return axios({ url: '/user/userAddress/auth/findUserAddressList',  method: 'get' })
}
//获取交易也订单    /api/order/auth/trade  get
export function reqOrderData() {
    return axios({ url: '/order/auth/trade',  method: 'get' })
}
//提交订单  /api/order/auth/submitOrder?tradeNo={tradeNo}   post
export function reqPlaceOrder(tradeNo,data) {
    return axios({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,data,  method: 'post' })
}
//获取交易信息/api/payment/weixin/createNative/{orderId}  get
export function reqOrderInfo(orderId) {
    return axios({ url: `/payment/weixin/createNative/${orderId}`,  method: 'get' })
}
//获取支付状态  /api/payment/weixin/queryPayStatus/{orderId} get
export function reqOrderState(orderId) {
    return axios({ url: `/payment/weixin/queryPayStatus/${orderId}`,  method: 'get' })
}
//获取订单列表  /api/order/auth/{page}/{limit}  get  page页码  limit显示数量
export function reqPayOrderList(page,limit) {
    return axios({ url: `/order/auth/${page}/${limit}`,  method: 'get' })
}




//banner和floor的mock数据
export function reqGetBannerList() {
    return mock({ url: '/mock/banner', method: 'get' })
};
export function reqGetFloorList() {
    return mock({ url: '/mock/floor', method: 'get' })
};

//获取支付状态 支付中
export function reqGetpaying() {
    return mock({ url: '/mock/paying', method: 'get' })
};
//获取支付状态 支付完成
export function reqGetpaySuccess() {
    return mock({ url: '/mock/paySuccess', method: 'get' })
};