// pages/game/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        imgUrls: [
           '../../resource/images/game/sildepic1.jpg',
           '../../resource/images/game/sildepic2.jpg',
           '../../resource/images/game/sildepic3.jpg',
           '../../resource/images/game/sildepic4.jpg'
         ],
        functions: [
            {
              "name": "双人五子棋",
              "pic_url": '../../resource/images/game/chess.png',
              "page_url":'../gamePackage/gobang/gobang'
            },
            {
              "name": "2048小游戏",
              "pic_url": '../../resource/images/game/board-games.png',
              "page_url":'../gamePackage/2048/2048'
            },
            {
              "name": "资源大厅",
              "pic_url": '../../resource/images/game/bookshelf.png',
              "page_url":'../gamePackage/shareResource/shareResource'
            },
            {
              "name": "漂流瓶",
              "pic_url": '../../resource/images/game/bottle.png',
              "page_url":'../gamePackage/driftingBottle/driftingBottle'
            }
          ]
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


  /**
   * 图片点击跳转
   */
  toPage(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.name
    })
  }
})