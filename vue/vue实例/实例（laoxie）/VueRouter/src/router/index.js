/**
 * hash路由的原理
 * * 表面：根据hash值的改变来渲染不同的组件
 * * 底层：根据window的hashchange事件来相应不同的组件
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../pages/Home.vue';
import List from '../pages/List.vue';
import Goods from '../pages/Goods.vue';
import Cart from '../pages/Cart.vue';
import Login from '../pages/Login.vue';
import NotFound from '../pages/NotFound.vue';

Vue.use(VueRouter);

let router = new VueRouter({
    routes:[
        // 当浏览器地址为path路径是时，自动渲染component对应组件
        {
            path:'/',//重定向：当浏览器url地址为/,自动跳转到/home
            redirect:'/home'
        },
        {
           name:'Home',
           path:'/home',
           component:Home 
        },
        {
            name:'List',
            path:'/list',
            component:List 
         },
         {
            name:'Goods',
            path:'/goods',
            component:Goods, 
            //props为true: 等效于<Goods v-bind="{$route.params}"/>
            // props:true,

            //props为Object: 等效于<Goods v-bind="Object"/>
            // props:{username:'laoxie',password:123},

            //props为Object: 等效于<Goods v-bind="Object"/>
            //props为函数：
            // props:function(){
            //     return {
            //         id:route.params.id,
            //         keyword:route.query.keyword
            //     }
            // }

         },
         {
            name:'Cart',
            path:'/cart',
            component:Cart,
            meta:{
                //做全局守卫验证是否登录
                requiresAuth:true
            }
         },
         {
            name:'Login',
            path:'/login',
            component:Login,
            // 单个路由独享(多余补充)
            beforeEnter(to,from,next){
                let username = localStorage.getItem('username');
                if(username){
                    name:'Home'
                }else{
                    next();
                }
            }
         },

         // 404
         {
            path:'*',
            component:NotFound
         },

    ]
});

// 全局路由守卫
// 路由拦截：
router.beforeEach((to,from,next)=>{
    //to: Route: 即将要进入的目标 路由对象
    //from: Route: 当前导航正要离开的路由
    console.log('beforeEach',to,from,next)
         // 需要登录的模块，判断是否已登录
    if(to.meta.requiresAuth){
        let username = localStorage.getItem('username');
        if(username){
            next();
        }else{
            console.log('from:',to.fullPath)
            next({
                name:'Login',
                params:{from:to.fullPath}
            })
        }
    }else{
        next();
    }     
    
});

export default router
 