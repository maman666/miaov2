class Event {
    constructor(){
        this.handlers = {}; //记录所有的事件及处理函数
        /*
            {
                click:[fn1,fn2],
                mouseover: [fn3,fn4]
            }
        */
    }
    /**
     * on 添加事件监听
     * @param type 事件类型
     * @param handler 事件处理函数
     */
    on(type,handler,once=false){
       if(!this.handlers[type]){
         this.handlers[type] = [];
       }
       if(!this.handlers[type].includes(handler)){
         this.handlers[type].push(handler);
         handler.once = once;
       }
    }
    /**
     * off 取消事件监听
     * @param type 要取消的事件类型
     * @param handler 要取消的事件函数,如果不传则清除该类型所有函数
     */
    off(type,handler){
        if(this.handlers[type]){
            if(handler === undefined){
                this.handlers[type] = [];
            } else {
                this.handlers[type] = this.handlers[type].filter(f => f!=handler);
            }
        }
    }
    /**
     * trigger  执行函数
     * @param type 要执行哪个类型的函数
     * @param eventData 事件对象
     * @param point this执行
     */
    trigger(type,eventData={},point=this){
        if(this.handlers[type]){
            this.handlers[type].forEach(f => {
                f.call(point,eventData);
                if(f.once){
                    this.off(type,f);
                }
            });
        }
    }
    /**
     * once 该函数只执行一次
     * @param type 事件类型
     * @param handler 事件处理函数
     */
    once(type,handler){
        this.on(type,handler,true);
    }
}