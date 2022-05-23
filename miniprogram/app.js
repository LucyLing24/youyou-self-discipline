// app.js
const themeListeners = []
global.isDemo = true
App({
  globalData: {
    theme: wx.getSystemInfoSync().theme,
    hasLogin: false,
    openid: null,
    iconTabbar: '',
  },
  onLaunch: function(options){
    wx.cloud.init({
      env:'cloud1-0g6c5avn84232189',
      traceUser:true
    })
  }
})
