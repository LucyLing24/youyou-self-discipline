// pages/gamePackage/gobang/Player_VS_AI/Player_VS_AI.js
var app = getApp()

var stack=[]; //用于悔棋操作的栈，pop()删除最后一个元素并将其返回
var weightDic=[   //权值表,默认1黑2白,共20种情况
  '1',20,
  '11',410,     
  '111',500,
  '1111',8000,
  "12",4,
  "112", 70,
  '1112', 450,
  "11112", 8000,
  "2", 8,
  "22", 80,
  "222", 470,
  "2222", 9000,
  "22221",10000,
  "21", 6,
  "221", 60,
  "2221", 600,
  "121", 5,
  "1221", 5,
  "2112", 5,
  "212", 5,
];
var win=0   //0代表游戏未结束
//棋盘数组初始化
function initChessBoard() {  
  let arr = [];
  //选择使用一维数组来存储棋子，因为使用二维数组渲染至页面较为复杂
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
    chessBoard_2d:[],
    

    chessScore:[], //存放AI落子权重

    shapeArr:[],
    shape:"",  //记录周围棋子的落子情况
    
  },
  
  directions: [
    [1, 0],   //向左右
    [0, 1],   //向上下
    [1, 1],   //向右下和左上
    [-1, 1]   //向右上和左下
  ],

  onLoad () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    });
    //初始化二维数组
    for(var i=0;i<15;i++){
      this.data.chessBoard_2d.push([])
      for(var j=0;j<15;j++){
        this.data.chessBoard_2d[i].push('0')
      }
    }
    win=0
  },

  //落子
  step(event) {
    var pos = event.currentTarget.dataset.pos;
    console.log(pos)
    if (this.data.chessBoard[pos] == "white" || this.data.chessBoard[pos] == "black") return;
    
    this.data.chessBoard[pos] = "black";
    
    stack.push(pos)     //压入栈中

    this.setData({    //将逻辑层数据传到视图层
      chessBoard: this.data.chessBoard
    })

    

    //将棋盘转化为二维数组，便于胜负判定与AI计算
    for(var i=0;i<15;i++){
      for(var j=0;j<15;j++){
        this.data.chessBoard_2d[i][j]=this.data.chessBoard[i*15+j];
      }
    }
    this.judge(pos);
    // console.log(this.data.chessBoard_2d)
    if(win==0){
      this.AI_step()
      //机器人落子跟在玩家之后
    }
    
  },

  //计算某一方向上的棋子情况,必须与目标点相邻,返回权值(白棋ai使用)
  countChessWeightInOneDirection_white(x,y,direction_x,direction_y){
    this.data.count=0
    this.data.shape=''
    
    while(this.data.count<=4){
          x+=direction_x;y+=direction_y;this.data.count++;
          
          if(x>=0&&x<=14&&y>=0&&y<=14&&this.data.chessBoard_2d[y][x]=='black'){
            this.data.shape+='1'
          }
          else if(x>=0&&x<=14&&y>=0&&y<=14&&this.data.chessBoard_2d[y][x]=='white'){
            this.data.shape+='2'
          }
          else {
            break
          }
    }
  while(1){
    var i;
    for(i=0;i<40;i++){
      if(this.data.shape==weightDic[i]){
        return weightDic[i+1]
      }
    }
    return 0;
  }

  },
  //计算某一方向上的棋子情况,必须与目标点相邻,返回权值(黑棋ai使用)
  countChessWeightInOneDirection_black(x,y,direction_x,direction_y){
    this.data.count=0
    this.data.shape=''
    
    while(this.data.count<=4){
          x+=direction_x;y+=direction_y;this.data.count++;
          
          if(x>=0&&x<=14&&y>=0&&y<=14&&this.data.chessBoard_2d[y][x]=='black'){
            this.data.shape+='2'
          }
          else if(x>=0&&x<=14&&y>=0&&y<=14&&this.data.chessBoard_2d[y][x]=='white'){
            this.data.shape+='1'
          }
          else {
            break
          }
    }
    
    // console.log(this.data.shape)
    // for(var i in weightDic){      // 似乎是遍历匹配时出现了问题，‘11’型没有查找到
    //   if(this.data.shape==i){
        
    //     return weightDic[this.data.shape]
    //   }
    //   else{
    //     return 0;
    //   }
    // }

  while(1){
    var i;
    for(i=0;i<40;i++){
      if(this.data.shape==weightDic[i]){
        return weightDic[i+1]
      }
    }
    return 0;
  }

  },
  //计算目标点的权值(白棋ai使用)
  calculatePositionWeight_white(position){
    var y0 = parseInt(position / 15),  //第几行
    x0 = position % 15,   //第几列
    maxWeight=0;
    
    //计算目标点权值
    var right=this.countChessWeightInOneDirection_white(x0,y0,1,0)
    var left=this.countChessWeightInOneDirection_white(x0,y0,-1,0)
    var down=this.countChessWeightInOneDirection_white(x0,y0,0,1)
    var up=this.countChessWeightInOneDirection_white(x0,y0,0,-1)
    var right_up=this.countChessWeightInOneDirection_white(x0,y0,1,-1)
    var left_up=this.countChessWeightInOneDirection_white(x0,y0,-1,-1)
    var left_down=this.countChessWeightInOneDirection_white(x0,y0,-1,1)
    var right_down=this.countChessWeightInOneDirection_white(x0,y0,1,1)
    var weightArr=[right,left,down,up,right_up,left_down,left_up,right_down]
    
    //这里对于权值的计算可以优化，从而解决双活三的类似问题

    //原始版本：仅把目标点八个方向上的权值最大的布局作为目标点的权值
    //效果：无法处理‘11-11’型问题，容易被下套
    // for(var i=0;i<8;i++){ 
    //   if(maxWeight<=weightArr[i]){
    //     maxWeight=weightArr[i]
    //   }
    // }

    //处理方法一：将目标点两端的布局权重相加再求最大值
    //效果：可以解决一些类似双活三的问题，但是存在部分落子不正常的情况,这里必须要根据实际情况对权值进行一些修改，处理一些比较明显的问题之后效果就得到很大改善,目前对于隔子下套已经可以较好应对，但是双活三问题依旧存在
    for(var i=0;i<4;i++){
      if(maxWeight<=(weightArr[2*i]+weightArr[2*i+1])){
        maxWeight=(weightArr[2*i]+weightArr[2*i+1])
      }
    }

    this.data.chessScore[position]=maxWeight

  },
  //计算目标点的权值(黑棋ai使用)
  calculatePositionWeight_black(position){
    var y0 = parseInt(position / 15),  //第几行
    x0 = position % 15,   //第几列
    maxWeight=0;
    
    //计算目标点权值
    var right=this.countChessWeightInOneDirection_black(x0,y0,1,0)
    var left=this.countChessWeightInOneDirection_black(x0,y0,-1,0)
    var down=this.countChessWeightInOneDirection_black(x0,y0,0,1)
    var up=this.countChessWeightInOneDirection_black(x0,y0,0,-1)
    var right_up=this.countChessWeightInOneDirection_black(x0,y0,1,-1)
    var left_up=this.countChessWeightInOneDirection_black(x0,y0,-1,-1)
    var left_down=this.countChessWeightInOneDirection_black(x0,y0,-1,1)
    var right_down=this.countChessWeightInOneDirection_black(x0,y0,1,1)
    var weightArr=[right,left,down,up,right_up,left_down,left_up,right_down]
    
    //这里对于权值的计算可以优化，从而解决双活三的类似问题

    //原始版本：仅把目标点八个方向上的权值最大的布局作为目标点的权值
    //效果：无法处理‘11-11’型问题，容易被下套
    // for(var i=0;i<8;i++){
    //   if(maxWeight<=weightArr[i]){
    //     maxWeight=weightArr[i]
    //   }
    // }

    //处理方法一：将目标点两端的布局权重相加再求最大值
    //效果：可以解决一些类似双活三的问题，但是存在部分落子不正常的情况,这里必须要根据实际情况对权值进行一些修改，处理一些比较明显的问题之后效果就得到很大改善,目前对于隔子下套已经可以较好应对，但是双活三问题依旧存在
    for(var i=0;i<4;i++){
      if(maxWeight<=(weightArr[2*i]+weightArr[2*i+1])){
        maxWeight=(weightArr[2*i]+weightArr[2*i+1])
      }
    }

    this.data.chessScore[position]=maxWeight

  },
  //AI落子
    AI_step(){
    for(let i=0;i<225;i++){
      this.data.chessScore[i]=0;  //权值清零
    }
    
    //遍历棋盘的所有位置
    for(let i=0;i<225;i++){
      if(this.data.chessBoard[i]=='0'){   //选出空点进行权值计算
        this.calculatePositionWeight_white(i);
      }
    }
    
    //选出权值最大的落子点
    var max,maxPos=0;
    // console.log(this.data.chessScore)
    for(let i=1,max=this.data.chessScore[0];i<225;i++){
      if(max<this.data.chessScore[i]){
        max=this.data.chessScore[i];
        maxPos=i;
      }
    }
    // console.log(max)

    //落子
    this.data.chessBoard[maxPos]="white";  
    stack.push(maxPos)   //压入栈中

    //将棋盘转化为二维数组，便于胜负判定与AI计算
    for(var i=0;i<15;i++){
      for(var j=0;j<15;j++){
        this.data.chessBoard_2d[i][j]=this.data.chessBoard[i*15+j];
      }
    }
    this.judge(maxPos)

    this.setData({    //将逻辑层数据传到视图层
      chessBoard: this.data.chessBoard
    })
    console.log('AI:'+maxPos)
  },
  //落子提示/帮助(黑棋ai落子)
  promptChess(){
    for(let i=0;i<225;i++){
      this.data.chessScore[i]=0;  //权值清零
    }
    
    //遍历棋盘的所有位置
    for(let i=0;i<225;i++){
      if(this.data.chessBoard[i]=='0'){   //选出空点进行权值计算
        this.calculatePositionWeight_black(i);
      }
    }
    
    //选出权值最大的落子点
    var max,maxPos=0;
    // console.log(this.data.chessScore)
    for(let i=1,max=this.data.chessScore[0];i<225;i++){
      if(max<this.data.chessScore[i]){
        max=this.data.chessScore[i];
        maxPos=i;
      }
    }
    // console.log(max)

    //落子
    this.data.chessBoard[maxPos]="black";  
    stack.push(maxPos)   //压入栈中

    //将棋盘转化为二维数组，便于胜负判定与AI计算
    for(var i=0;i<15;i++){
      for(var j=0;j<15;j++){
        this.data.chessBoard_2d[i][j]=this.data.chessBoard[i*15+j];
      }
    }
    this.judge(maxPos)

    this.setData({    //将逻辑层数据传到视图层
      chessBoard: this.data.chessBoard
    })
    console.log('AI-help:'+maxPos)

    if(win==0){
      this.AI_step();    //机器人落子跟在玩家之后
    }
  },
  //判断胜负(有bug!，需要使用chessBoard_2d来进行判定)
  judge(pos) {
    var color = this.data.chessBoard[pos];
    var y0 = parseInt(pos / 15),  //第几行
    x0 = pos % 15, x, y, round;   //第几列
    //以y0*15+x0便可得到棋子的下标

    for (var i = 0; i < 4; i++) {   //统计四个方向
      var number = 0;
      //正向先检测五个
      round = 0;
      for (x = x0, y = y0; round < 5; x += this.directions[i][0], y += this.directions[i][1], round++) {
        if (x>=0&&x<=14&&y>=0&&y<=14&&this.data.chessBoard_2d[y][x] == color) {
          number++;
        }
        else {
          break;
        }
      }
      //相反方向再检测五个
      round = 0;
      for (x = x0, y = y0; round < 5; x -= this.directions[i][0], y -= this.directions[i][1], round++) {
        if (x>=0&&x<=14&&y>=0&&y<=14&&this.data.chessBoard_2d[y][x] == color) {
          number++;
        }
        else {
          break;
        }
      }
      //检测到五子连珠
      if (number >= 6) {    //6个是因为落子棋子被统计了两次
        win=1;
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
                url: "./Player_VS_AI"
              });
            }
            else{
              win=0;
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
            chessBoard_2d:[],
            result: "",
            count:0,
            });
            for(var i=0;i<15;i++){
              that.data.chessBoard_2d.push([])
              for(var j=0;j<15;j++){
                that.data.chessBoard_2d[i].push('0')
              }
            }
        }
      },
    })


    
  },
  //悔棋
  regretChess(){
    if(stack.length>=2){
      //从栈中删除两个元素
      var returnChessPos1=stack.pop();
      var returnChessPos2=stack.pop();
      this.data.chessBoard[returnChessPos1]="0";
      this.data.chessBoard[returnChessPos2]="0";
      
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