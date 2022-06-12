// pages/clockin/clockinPackage/pages/showDetails/showDetails.js
Page({
    // 保存展示待办的 _id 和详细信息
    data: {
      _id: '',
      todo: {
        title: '',
        desc:'',
        complete: false,
        kind:'',
        change:'',
        openId:'',
      },
    },
  
    onLoad(options) {
      // 保存上一页传来的 _id 字段，用于后续查询待办记录
      if (options.id !== undefined) {
        this.setData({
          _id: options.id
        })
      }
      this.setTodoData();
    },
    setTodoData(){
      console.log(this.data._id);
      wx.cloud.callFunction({
        name: 'getSingleMission',
        config: {
          env: getApp().globalData.env
        },
        data:{
          _id: this.data._id
        }
      }).then((resp) => {
        console.log(resp);
        this.setData({
          todo:{
            title: resp.result.data[0].title,
            desc: resp.result.data[0].desc,
            complete: resp.result.data[0].complete,
            kind: resp.result.data[0].kind,
            change: resp.result.data[0].award,
            openId: resp.result.data[0].openId
          }
        })
      })
    },
    finishMission(){
      wx.cloud.callFunction({
        name: 'finishMission',
        config: {
          env: getApp().globalData.env
        },
        data:{
          _id: this.data._id
        }
      }).then((resp) => {
        console.log(resp);
      }).then((resp) => {
        wx.cloud.callFunction({
          name: 'updUserInfo',
          config: {
            env: getApp().globalData.env
          },
          data:{
            openId: this.data.todo.openId,
            kind: this.data.todo.kind,
            change: this.data.todo.change,
          }
        })
      }).then((resp) => {
        this.sleep(2000);
        wx.showToast({
          icon: "none",
          title: this.data.todo.kind + '增加' + this.data.todo.change + '点，经验值增加5点',
          duration: 6000
        });
      })
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    /*
    // 根据 _id 值查询并显示待办数据
    async onShow() {
      if (this.data._id.length > 0) {
        const db = await getApp().database()
        // 根据 _id 值查询数据库中对应的待办事项
        db.collection(getApp().globalData.collectionMissionList).where({
          _id: this.data._id
        }).get().then(res => {
          // 解包获得待办事项
          const {
            data: [todo]
          } = res
          // 将数据保存到本地、更新显示
          this.setData({
            todo
          })
        })
      }
    },
    */
  })