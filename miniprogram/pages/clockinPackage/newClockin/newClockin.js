// pages/clockin/clockinPackage/pages/newClockin/newClockin.js
/* 新增待办页面 */

Page({
    // 保存编辑中待办的信息
    data: {
      title: '',
      desc: '',
      freq: 0,
      award: 0
    },
  
    // 表单输入处理函数
    onTitleInput(e) {
      this.setData({
        title: e.detail.value
      })
    },
    onDescInput(e) {
      this.setData({
        desc: e.detail.value
      })
    },
    onAwardInput(e) {
      this.setData({
        award: e.detail.value
      })
    },
  
    // 保存待办
    async saveMission() {
      // 对输入框内容进行校验
      if (this.data.title === '') {
        wx.showToast({
          title: '事项标题未填写',
          icon: 'error',
          duration: 2000
        })
        return
      }
      if (this.data.title.length > 10) {
        wx.showToast({
          title: '任务标题过长',
          icon: 'error',
          duration: 2000
        })
        return
      }
      if (this.data.desc.length > 100) {
        wx.showToast({
          title: '任务描述过长',
          icon: 'error',
          duration: 2000
        })
        return
      }
      if (this.data.award <= 0) {
        wx.showToast({
          title: '一定要有奖励！',
          icon: 'error',
          duration: 2000
        })
        return
      }
      wx.cloud.callFunction({
        name: 'addMission',
        config: {
          env: getApp().globalData.env
        },
        data:{
          openId: getApp().globalData.openId,
          title: this.data.title,
          desc: this.data.desc,
          award: this.data.award
        }
      }).then((resp) => {
        wx.showToast({
          title: '添加成功',
        })
      })
    },
  
    // 重置所有表单项
    resetMission() {
      this.setData({
        title: '',
        desc: '',
        freq: 0,
        award: 0
      })
    }
  })