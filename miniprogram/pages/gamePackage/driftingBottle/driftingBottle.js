// pages/game/gamePackage/pages/driftingBottle/driftingBottle.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        throwBottleData: "",
        getBottleData: "",
        isThrowVisible: true,
        isGetVisible: false
    },
    throwBottle(){
        this.setData({
            isGetVisible : false,
            isThrowVisible : true
        });
    },
    throwInput(e){
        this.setData({
            throwBottleData: e.detail.value
        })
    },
    getBottle(){
        this.setData({
            isGetVisible : true,
            isThrowVisible : false
        });
        wx.cloud.callFunction({
            name: "getRandomBottle",
            config: {
                env: getApp().globalData.env
            }
        }).then((resp) => {
            const message = "当前为用户" + resp.result.openId 
            + "的消息： \n" + resp.result.message;
            // console.log(message);
            this.setData({
                getBottleData: message
            })
        })
    },
    getInput(e){
        this.setData({
            getBottleData: e.detail.value
        })
    },
    submitBottle(){
        console.log(123213);
        wx.cloud.callFunction({
            name: 'throwBottle',
            config: {
                env: getApp().globalData.env
            },
            data:{
                openId: getApp().globalData.openId,
                message: this.data.throwBottleData
            }
        }).then((resp) => {
            console.log(resp);
            wx.showToast({
              title: '添加成功',
            })
        })
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

    }
})