//获取应用实例
var app = getApp()


var stack=[]; //用于悔棋操作的栈，pop()删除最后一个元素并将其返回
//棋盘数组初始化
function initChessBoard() {  
  let arr = [];
  //选择使用一维数组来存储棋子，因为使用二维数组实在过于复杂
  for (let i = 0; i < 225; i++) {
    arr.push('0')
  }
  return arr;
}
var Pi = Page({
  data: {
    logs: [],
    chessBoard: initChessBoard(),   //棋盘
    result: "",
    count: 0,
  },
  
  directions: [
    [1, 0],
    [0, 1],
    [1, 1],
    [-1, 1]
  ],

  onLoad () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  },
  //落子
  step(event) {
    var pos = event.currentTarget.dataset.pos;
    if (this.data.chessBoard[pos] == "white" || this.data.chessBoard[pos] == "black") return;
    this.data.count++;
    
    if (this.data.count % 2)    //这里认为1代表黑棋，2代表白棋，与权值表对应
      this.data.chessBoard[pos] = "black";
    else 
      this.data.chessBoard[pos] = "white";

    stack.push(pos)     //压入栈中

    this.setData({    //将逻辑层数据传到视图层
      chessBoard: this.data.chessBoard
    })
    this.judge(pos);
  },
  
  //判断胜负
  judge(pos) {
    var color = this.data.chessBoard[pos];
    var x0 = parseInt(pos / 15),  //第几列
    y0 = pos % 15, x, y, round;   //第几行
    //以x0*15+y0便可得到棋子的下标

    for (var i = 0; i < 4; i++) {   //统计四个方向
      var number = 0;
      //正向先检测五个
      round = 0;
      for (x = x0, y = y0; round < 5; x += this.directions[i][0], y += this.directions[i][1], round++) {
        if (this.data.chessBoard[15 * x + y] == color) {
          number++;
        }
        else {
          break;
        }
      }
      //相反方向再检测五个
      round = 0;
      for (x = x0, y = y0; round < 5; x -= this.directions[i][0], y -= this.directions[i][1], round++) {
        if (this.data.chessBoard[15 * x + y] == color) {
          number++;
        }
        else {
          break;
        }
      }
      //检测到五子连珠
      if (number >= 6) {    //6个是因为落子被统计了两次
        if(color=="black")
          var t_color="黑方"
        else
          var t_color="白方"
        //跳出对话框
        wx.showModal({
          title: t_color + '获胜!',
          content: '再来一局?',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: "./Player_VS_Player"
              });
            }
            else if(res.cancel){
              wx.navigateTo({
                url: '../Menu/Menu',
              })
            }
          },
        })
      }
    }
  },
  //重新开始
  restart () {
    var that=this;
    //跳出对话框
    wx.showModal({
      content: '确定要重新开始?',
      success: function (res) {
        if (res.confirm) {
            that.setData({
            logs: [],
            chessBoard: initChessBoard(),
            result: "",
            });
            that.data.count = 0;
        }
      },
    })


    
  },
  //悔棋
  regretChess(){
    if(stack.length!=0){
      //从栈中删除两个元素
      var returnChessPos=stack.pop();
      this.data.chessBoard[returnChessPos]="0";
      this.data.count--;
      //将逻辑层数据传到视图层
      this.setData({    
        chessBoard: this.data.chessBoard
      })
    }
    else{
      return;
    }
  },
  //返回菜单
  getBackToMenu(){
    wx.navigateBack({
      url: "./Player_VS_Player"
    });
  },
})
