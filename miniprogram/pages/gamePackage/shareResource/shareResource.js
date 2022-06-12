// pages/gamePackage/shareResource/shareResource.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      postList: [
      {
          id: 1,
          username: "Rebecca",
          img: "../../../resource/images/game/images/icon1.jpeg",
          content: "选择 Kindle 而不是纸质书的原因是什么？难道不明白纸质书更贵啊！！！ 若觉得kindle更贵，我觉得要么阅读量太少，那确实没有买kindle的必要。要么买的都是盗版的纸质书？我不清楚不加以评论。。。 另外，用kindle看小说的怎么真心不懂了...",
          support_num: "112",
          comment_num: "18",
          comments:[
            {
              comment_user:"aa",
              comment_content:"nsdd!"
            },
            {
              comment_user:"aa",
              comment_content:"kindle yyds!"
            },
            {
              comment_user:"aa",
              comment_content:"赞同"
            }
          ]
      },
      {
        id: 2,
        username: "Alex",
        img: "../../../resource/images/game/images/icon8.jpg",
        content: "音乐有公认的经典，也有明显的流行趋势没有错。但归根结底，音乐是一种艺术，艺术是很主观的东西。跟画作一个道理，毕加索是大家，但很多人看不懂他的话，甚至觉得很难看...",
        support_num: "112",
        comment_num: "18",
        comments:[
          {
            comment_user:"aa",
            comment_content:"nsdd!"
          },
          {
            comment_user:"aa",
            comment_content:"kindle yyds!"
          },
          {
            comment_user:"aa",
            comment_content:"赞同"
          }
        ]
      },
      {
        id: 3,
        username: "George",
        img: "../../../resource/images/game/images/icon9.jpeg",
        content: "我不知道那个铁塔的情况，不过气象铁塔上会有一些测太阳辐射的设备，如果说辐射的话，太阳辐射那么多，大家赶紧躲进地底下呀~~~~~要不然辐射量这么大，会变异的呀~~~~",
        support_num: "112",
        comment_num: "18"
      },
      {
        id: 4,
        username: "Rebecca",
        img: "../../../resource/images/game/images/icon1.jpeg",
        content: "难道不明白纸质书更贵啊！！！ 若觉得kindle更贵，我觉得要么阅读量太少，那确实没有买kindle的必要。要么买的都是盗版的纸质书？我不清楚不加以评论。。。 另外，用kindle看小说的怎么真心不懂了...",
        support_num: "112",
        comment_num: "18"
      }
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  toDetailPage(e) {
    const postIndex = e.currentTarget.dataset.index
    const post = this.data.postList[postIndex]
    wx.navigateTo({
      url: '../shareResource/details/details',
    })
  },
})