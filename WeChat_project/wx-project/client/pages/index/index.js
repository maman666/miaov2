  //index.js
  //获取应用实例
  const app = getApp()

  let maN = Math.random();
  Page({
    data: {
      num: Math.random(maN * 1000)
    },

    // 触发自定义事件回调函数
    getMagicNumber(ev) {
      console.log(ev)
      this.setData({
        num: Math.floor(ev.detail * 1000)
      })
    },

    // 编程式导航点击跳转
    goToLog() {
      wx.navigateTo({
        url: '/pages/logs/logs',
      })
    },

    // 获取用户信息授权
    onGetUserInfo(e) {
      console.log(e)
    },
    //普通授权方式
    onTry() {
      wx.getUserInfo({
        success: msg => {
          console.log(msg, '个人信息获取成功')
        },
        fail: err => {
          console.log(err, '个人信息获取失败')
        }
      })
    },

    // 指定授权 
    onAuthLocation() {
      wx.authorize({ //指定授权信息
        scope: 'scope.userLocation', //指定授权为地理位置 
        success: msg => console.log(msg, '地理授权成功'),
        fail: e => console.log(e, '地理授权失败')
      })
    },
    //获取位置
    onGetLocation() {
      wx.getLocation({
        success: msg => console.log(msg, '位置获取成功'),
        fail: e => console.log(e, '位置获取失败')
      })
    },

    //获取授权信息
    onGetSetting() {
      wx.getSetting({
        success: msg => console.log(msg, '授权的相关信息')
      })
    },

    // 手动打开授权信息面板
    onGotoSetting() {
      wx.openSetting({
        success: msg => console.log(msg, '手动设置完成')
      })
    },

    // 数据缓存 方便所有页面取数据
    onCache() {
      // 异步缓存
      wx.setStorage({
        key: 'name',
        data: {
          p1: 'xiaoxie'
        },
        success: () => {
          console.log('存储名字成功')
          wx.getStorage({
            key: 'name',
            success: data => {
              console.log(data)
            },
          })
        }
      })
      //同步缓存
      // wx.setStorageSync('age', '19');
      // let a = wx.getStorageSync('age');
      // console.log(a)
    },

    //数据请求 koa
    onReq() {
      //开启loading效果
      wx.showLoading({
        title: '请求中',
      })
      wx.request({
        url: 'http://localhost:3000/hello',
        data: {
          name: 'xiaoxie'
        },
        method: 'POST',
        success: res => {
          console.log(res)
          //成功后关闭loading
          setTimeout(() => {
            wx.hideLoading();
            //弹窗效果
            wx.showToast({
              title: res.errMsg,
            })
          }, 1000)
        },
        fail:e=>{
          setTimeout(() => {
            wx.hideLoading();
            //弹窗效果
            wx.showToast({
              title: e.errMsg
            })
          }, 1000)
        }

      })
    },

    //数据请求2 express
    onReq2(){
      wx.request({
        url: 'http://localhost:3001',
        success(res){
          wx.showToast({
            title: res.data,
          })
        },
        fail(e){
          wx.showToast({
            title: e.errMsg,
          })
        }
      })
    }
  })