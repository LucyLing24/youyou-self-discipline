// pages/gamePackage/shareResource/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: {
          id: 1,
          username: "Rebecca",
          img: "../../../../resource/images/game/images/icon1.jpeg",
          content: "若觉得kindle更贵，我觉得要么阅读量太少，那确实没有买kindle的必要。要么买的都是盗版的纸质书？我不清楚不加以评论。。。\n另外，用kindle看小说的怎么真心不懂了。题主不看小说么？难道题主拿来看教科书还是技术文档？还是题主觉得小说就是小时代内样的？（对小时代没偏见，尊重多样性）\n而且纸质书搬起来真心困难啊！当初毕业带不回来，忍痛卖了不少好桑心！\n\n碎片时间阅读总不能天天背着一本书吧，那么占地方。\n看到描述最后一段，感觉有骗答案的嫌疑",
          support_num: "112",
          comment_num: "18",
          comments:[
            {
              comment_user:"aa",
              comment_content:"nsdd!"
            },
            {
              comment_user:"bb",
              comment_content:"kindle yyds!"
            },
            {
              comment_user:"cc",
              comment_content:"赞同"
            }
          ]
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
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
  giveComment(e) {
    const postIndex = e.currentTarget.dataset.index
    const post = this.data.postList[postIndex]
    wx.navigateTo({
      url: '../comment/comment',
    })
  }
})