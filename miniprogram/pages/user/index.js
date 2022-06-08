// pages/user/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      username:"瓏酱007",
      person:[
        "../../resource/images/user/person1.gif",
        "../../resource/images/user/person2.gif",
        "../../resource/images/user/person3.gif",
        "../../resource/images/user/person4.gif",
        "../../resource/images/user/person5.gif"
      ],
      value:{
        "intelligenceValue":212,
        "strengthValue":233,
        "charmValue":324,
        "healthValue":453,
        "level":6,
        "exp":333
      }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        url: '../userPackage/achievements/index',
      })
    }

})