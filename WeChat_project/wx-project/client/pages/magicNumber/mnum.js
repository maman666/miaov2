
// 注册组件用Component 不能用Page因为这是注册页面
Component({

// 自定义属性 驼峰命名
properties:{
  nowIn:String
},

  data:{
    magicNumber:Math.random()
  },

//一进去页面就触发attached生命周期 触发getMagicNumber事件 回调函数
  attached(){
    console.log(this.data)
    this.triggerEvent('getMagicNumber', this.data.magicNumber)
  },

// 自定义组件用到methods
  methods:{
    onTap(event) {
      this.setData({
        magicNumber: Math.random()
      });

      // 自定义事件 把数据传过去
      this.triggerEvent('getMagicNumber', this.data.magicNumber)
    
    } 
  }

  
})

