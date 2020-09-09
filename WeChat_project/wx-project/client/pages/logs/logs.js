//logs.js
const util = require('../../utils/util.js')

Page({
 data:{
   name:''
 },
 //同步利用缓存方式获取文字
  getName(){
    let name = wx.getStorageSync('name');
    if(name){
      this.setData({
        name:name.p1
      })
    }
  },

  //同步删除缓存文字
  removeName(){
    wx.removeStorageSync('name');
  }
})
