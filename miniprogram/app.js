// app.js
const themeListeners = []
global.isDemo = true
App({
  globalData: {
    theme: wx.getSystemInfoSync().theme,
    hasLogin: false,
    openId: "olXiE5VA_MiNunjWqBi_bS4_NQ2Q",
    env:'cloud1-0g6c5avn84232189',
    iconTabbar: '',
  },
  onLaunch: function(options){
    wx.cloud.init({
      env:'cloud1-0g6c5avn84232189',
      traceUser:true
    })
  }
})
