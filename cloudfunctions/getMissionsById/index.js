// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
  });
  
const db = cloud.database()
const Missions = db.collection("Missions")
// 云函数入口函数
exports.main = async (event, context) => {
    return await Missions.where({
        openId: event.openId
    }).get();
}