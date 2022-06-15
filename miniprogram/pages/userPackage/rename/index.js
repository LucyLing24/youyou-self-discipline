// pages/userPackage/rename/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        old_username: '',
        new_username: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getOldUsername();
    },
    getOldUsername(){
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
                old_username: userData.username,
            })
          })
    },
    input_func(e){
        this.setData({
            new_username: e.detail.value
        })
    },
    rename_button_tap(){
        wx.cloud.callFunction({
            name: 'updUserInfo',
            config: {
              env: getApp().globalData.env
            },
            data:{
              openId: getApp().globalData.openId,
              username: this.data.new_username,
              updType: 'updName'
            }
          }).then((resp) => {
            console.log(resp);
            wx.showToast({
              title: '修改成功',
            })
          })
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

    }
})