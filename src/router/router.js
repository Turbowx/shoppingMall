import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/store'

// import Home from '@/pages/Home/Home.vue'
// import Register from '@/pages/Register/Register'
// import Login from '@/pages/Login/Login'
// import Search from '@/pages/Search/Search.vue'
// import Deails from '@/pages/Details/Details.vue'
// import AddCartSuccess from '@/pages/AddCartSuccess/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart/ShopCart.vue'
// import Trade from '@/pages/Trade/Trade'
// import Pay from '@/pages/Pay/Pay'
// import PaySuccess from '@/pages/PaySuccess/PaySuccess'
// import Center from '@/pages/Center/Center'

// import MyOrder from '@/pages/Center/myOrder/MyOrder'
// import TuanOrder from '@/pages/Center/tuanOrder/TuanOrder'

//把VueRouter的原型方法push保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写push方法
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

Vue.use(VueRouter)

let router = new VueRouter({
    routes: [
        //重定向
        {
            path: '*',
            redirect: '/home',
            meta: { show: true }
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/pages/Home'),
            children: [],
            meta: { show: true }
        },
        {
            path: '/search/:keyword?',
            name: 'search',
            component: () => import('@/pages/Search/Search.vue'),
            meta: { show: true }
        },
        {
            path: '/login',
            name: 'login',
            component: ()=>import('@/pages/Login/Login'),
            meta: { show: false }
        },
        {
            path: '/register',
            name: 'register',
            component: ()=>import('@/pages/Register/Register'),
            meta: { shwo: false }
        },
        {
            path: '/details/:skuid',
            name: 'details',
            component: ()=>import('@/pages/Details/Details.vue'),
            meta: { shwo: false },
        },
        {
            path: '/addCartSuccess',
            name: 'addCartSuccess',
            component: ()=>import('@/pages/AddCartSuccess/AddCartSuccess'),
            meta: { shwo: true },
        },
        {
            path: '/ShopCart',
            name: 'shopCart',
            component: ()=>import('@/pages/ShopCart/ShopCart.vue'),
            meta: { shwo: true },
        },
        {
            path: '/trade',
            name: 'trade',
            component: ()=>import('@/pages/Trade/Trade'),
            meta: { shwo: true },
        },
        {
            path: '/pay',
            name: 'pay',
            component: ()=>import('@/pages/Pay/Pay'),
            meta: { shwo: true },
        },
        {
            path: '/paySuccess',
            name: 'paySuccess',
            component: ()=>import('@/pages/PaySuccess/PaySuccess'),
            meta: { shwo: true },
        },
        {
            path: '/center',
            name: 'center',
            component: ()=>import('@/pages/Center/Center'),
            redirect: '/myorder',
            meta: { shwo: true },
            children: [
                {
                    path: '/myorder',
                    name: 'myorder',
                    component: ()=>import('@/pages/Center/myOrder/MyOrder'),
                    meta: { shwo: true },
                },
                {
                    path: '/tuanorder',
                    name: 'tuanorder',
                    component: ()=>import('@/pages/Center/tuanOrder/TuanOrder'),
                    meta: { shwo: true },
                }
            ]
        }

    ],
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { top: 0 }
    },
})

router.beforeEach(async (to, from, next) => {
    //登陆之后不能再去login界面
    let token = store.state.user.token
    //用户信息
    let name = store.state.user.userInfo.name
    if (token) {
        //登录之后不可再次登陆
        if (to.path == "/login" || to.path == "/register") {
            next("/")
        } else {
            //去其他页面
            if (name) {
                next()
            } else {
                try {
                    await store.dispatch("getUserInfo")
                    next()
                } catch (error) {
                    await store.dispatch("LoginOut")
                    next("/login")
                }
            }
            next()
        }
    } else {
        //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
            next('/login?redirect=' + toPath);
        } else {
            //去的不是上面这些路由（home|search|shopCart）---放行
            next();
        }
    }


})

export default router;