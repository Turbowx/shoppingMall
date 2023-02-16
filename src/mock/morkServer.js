import Mock from 'mockjs'
//把SJSON数据格式引入进来JSON数据格式根本没有对外暴露，但是可以引入]
import Banner from './banner.json'
import Floors from './floors.json'
// import paying from  './paying.json'
// import paySuccess from  './paySuccess.json'

Mock.mock("/mock/banner", { code: 200, data: Banner });
Mock.mock("/mock/floor", { code: 200, data: Floors });
Mock.mock("/mock/paying", { code: 205, message:'支付中' });
Mock.mock("/mock/paySuccess", { code: 200, message:'支付完成' });

