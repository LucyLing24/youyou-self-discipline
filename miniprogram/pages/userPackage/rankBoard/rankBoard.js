// pages/user/userPackage/pages/rankBoard/rankBoard.js

Page({
  
  data: {
    userList: [
      { 
        id:1,
        avatarUrl:"/resource/images/user/cat.jpg",
        username:"aaa",
        alltime:100,
        intelligenceValue:1,
        strengthValue:2,
        charmValue:3,
        healthValue:4
      },
      {  
        id:2,
        avatarUrl:"/resource/images/user/cat.jpg",
        username:"aaa",
        alltime:100,
        intelligenceValue:1,
        strengthValue:2,
        charmValue:3,
        healthValue:4
      },
      { 
        id:3,
        avatarUrl:"/resource/images/user/cat.jpg",
        username:"aaa",
        alltime:100,
        intelligenceValue:1,
        strengthValue:2,
        charmValue:3,
        healthValue:4
      },
      { 
        id:4,
        avatarUrl:"/resource/images/user/cat.jpg",
        username:"aaa",
        alltime:100,
        intelligenceValue:1,
        strengthValue:2,
        charmValue:3,
        healthValue:4
      },
    ],
  },
  // 根据小说人气进行从大到小排序
  hotListSort: function() {
    var arr_length = this.data.userList.length;
    // 按人气排序获取数据数组的长度
    for(var i=0; i<arr_length; i++) {
      for(var j=0; j<arr_length - i - 1; j++) {
        let arr_popularity1 = this.data.userList[j].popularity;
        let arr_popularity2 = this.data.userList[j + 1].popularity;
        let arr_index1 = this.data.userList[j];
        let arr_index2 = this.data.userList[j+1];
        if(arr_popularity1<arr_popularity2) {
          // 对比相邻两个数组元素的大小
          let zhongjie1 = arr_index2.popularity;
          let zhongjie2 = arr_index2.title;
          let zhongjie3 = arr_index2.img;
          let zhongjie4 = arr_index2.author;
          let zhongjie5 = arr_index2.introduce;
          let zhongjie6 = arr_index2.status;
          // 把小的数组元素的值赋值给一个中介
          arr_index2.popularity = arr_index1.popularity;
          arr_index2.title = arr_index1.title;
          arr_index2.img = arr_index1.img;
          arr_index2.author = arr_index1.author;
          arr_index2.introduce = arr_index1.introduce;
          arr_index2.status = arr_index1.status;
          // 把大的数组元素赋值给小的数组元素
          arr_index1.popularity = zhongjie1;
          arr_index1.title = zhongjie2;
          arr_index1.img = zhongjie3;
          arr_index1.author = zhongjie4;
          arr_index1.introduce = zhongjie5;
          arr_index1.status = zhongjie6;
        }
      }
    }
    this.setData({
      userList: this.data.userList,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUserList();
  },
  getUserList(){
    wx.cloud.callFunction({
      name: 'getUserList',
      config: {
          env: getApp().globalData.env
      }
    }).then((resp) => {
      // console.log(resp);
      var userList = resp.result.data;
      userList = this.sortByKey(userList, "alltime");
      console.log(userList);
      this.setData({
        userList: userList
      })
    })
  },
  sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });
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