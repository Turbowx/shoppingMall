import axios from 'axios'
//导入进度条
import nprogress from 'nprogress';
//引入进度条样式
import 'nprogress/nprogress.css'
//引入仓库
import store from '@/store/store'
//axios.create创建一个实例
const service = axios.create({
    baseURL: '/api',
    //超时
    timeout: 5000,
})


//请求拦截器:在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
service.interceptors.request.use(
    config => {
        //config:配置对象，对象里面有一个属性很重要，headers请求头
        //滚动条开始start
        nprogress.start();
        //游客身份
        if (store.state.details.uuid_token) {
            config.headers.userTempId = store.state.details.uuid_token;
        }
        //是否有token
        if(store.state.user.token){
            config.headers.token = store.state.user.token;
        }
        return config
    },
    error => {
        console.log(error)
        Promise.reject(error)
    }
)

//响应拦截器
service.interceptors.response.use(res => {
    //成功的回调函数:服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    //滚动条结束done
    nprogress.done()
    return res.data;
},
    error => {
        return Promise.reject(new Error('失败'));
    }
)

export default service