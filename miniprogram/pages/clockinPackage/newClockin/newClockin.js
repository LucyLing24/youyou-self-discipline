// pages/clockin/clockinPackage/pages/newClockin/newClockin.js
/* 新增待办页面 */

Page({
    // 保存编辑中待办的信息
    data: {
      title: '',
      desc: '',
      kind: '智力',
      time: 0,
      award: 0,
      intelChecked: true, // 智力选项的被选中情况
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
    onTimeInput(e) {
      this.setData({
        time: e.detail.value
      })
    },
    handleChange(e){
      console.log(e);
      this.setData({
        kind: e.detail.value
      });
    },
    // 保存待办
    async saveMission() {
      console.log("start saving mission.")
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
          kind: this.data.kind,
          award: this.data.award,
          time: this.data.time
        }
      }).then((resp) => {
        wx.showToast({
          title: '添加成功',
        }).then(this.sleep(5000)).then((resp) => {
          wx.switchTab({
            url: '../../clockin/index',
          })
        })
      })
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    // 重置所有表单项
    resetMission() {
      console.log("reset mission.")
      this.setData({
        title: '',
        desc: '',
        kind: '智力',
        time: 0,
        award: 0
      })
      this.setData({
        intelChecked: true,
      })
    }
  })