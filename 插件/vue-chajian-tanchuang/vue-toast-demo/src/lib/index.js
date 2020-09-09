
// vue插件首先要引入 
import ToastComponent from './vue-toast.vue';

// 添加一个静态的类 必须定义 install方法 才能使用Vue.use()引用
// Vue.extend(ToastComponent) Vue去继承这个组件实例
// new ToastController() 相当于new Vue()才能使用
let Toast = {};
Toast.install = function(Vue,options){

    var opt = {
        duration:3000
    }

    for(var key in options){
        opt[key] = options[key];
    }

    Vue.prototype.$toast = function(message,option){

        if(typeof option == 'object'){
            for(var key in option){
                opt[key] = option[key];
            }
        }

        const ToastController = Vue.extend(ToastComponent);
        var instance = new ToastController().$mount(document.createElement("div"));

        instance.message = message;
        instance.visible = true;

        document.body.appendChild(instance.$el);

        setTimeout(()=>{
            instance.visible = false;
            document.body.removeChild(instance.$el);
        },opt.duration)
    }

    Vue.prototype.$toast['show'] = function(message,option){
        Vue.prototype.$toast(message,option);
    }
    Vue.prototype.$toast['success'] = function(message,option){
        Vue.prototype.$toast(message,option);
    }
    Vue.prototype.$toast['info'] = function(message,option){
        Vue.prototype.$toast(message,option);
    }
    Vue.prototype.$toast['error'] = function(message,option){
        Vue.prototype.$toast(message,option);
    }
}

if(window.Vue){
    Vue.use(Toast);
}

//导出
export default Toast;