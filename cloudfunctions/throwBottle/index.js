// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
  });
  
const db = cloud.database()
const Bottles = db.collection("Bottles")
// 云函数入口函数
exports.main = async (event, context) => {
    console.log(await Bottles.add({
        data:{
            openId: event.openId,
            message: event.message
        }
    }))
}