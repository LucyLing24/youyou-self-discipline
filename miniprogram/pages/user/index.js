// pages/user/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      username:"",
      person:[
        "../../resource/images/user/person1.gif",
        "../../resource/images/user/person2.gif",
        "../../resource/images/user/person3.gif",
        "../../resource/images/user/person4.gif",
        "../../resource/images/user/person5.gif"
      ],
      value:{
        "intelligenceValue":0,
        "strengthValue":0,
        "charmValue":0,
        "healthValue":0,
        "level":0,
        "exp":0
      },
      level: 0,
      look_index: 0,
      look_src: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.changeLook();
    },
    changeLook(){
      var cur_src = this.data.person[(this.data.look_index + 1) % this.data.person.length];
      this.setData({
        look_index: this.data.look_index + 1,
        look_src: cur_src
      })
    },
    rename(){
      wx.navigateTo({
        url: '../userPackage/rename/index',
      })
    },
    loadUserData(){
      wx.cloud.callFunction({
        name: 'getUserInfo',
        config: {
          env: getApp().globalData.env
        },
        data:{
          openId: getApp().globalData.openId
        }
      }).then((resp) => {
        // console.log(resp);
        const userData = resp.result.data[0];
        this.setData({
          username: userData.username,
          value:{
            "intelligenceValue":userData.intelligence,
            "strengthValue":userData.strength,
            "charmValue":userData.charm,
            "healthValue":userData.health,
            "level":userData.level,
            "exp":userData.exp
          }
        })
      }).then((resp) =>{
        this.refreshLevel();
      })
    },
    refreshLevel(){
      var level = 0;
      var cur_exp = this.data.value.exp;
      var cur_interval = 10;
      while(cur_exp >= 0){
        cur_exp -= cur_interval;
        level += 1;
        cur_interval += 5;
      }
      this.setData({
        level: level
      })
      console.log(cur_exp);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      this.loadUserData();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    // 跳转响应函数
    setting() {
      wx.navigateTo({
        url: '../userPackage/setup/setup',
      })
    },

    stat() {
      wx.navigateTo({
        url: '../userPackage/statisticsBoard/statisticsBoard',
      })
    },

    ranking() {
      wx.navigateTo({
        url: '../userPackage/rankBoard/rankBoard',
      })
    },
    achievements() {
      wx.navigateTo({
        url: '../../pages/userPackage/achievements/index',
      })
    }

})