// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
  });
  
const db = cloud.database()
const Users = db.collection("Users")
// 云函数入口函数
exports.main = async (event, context) => {
    return await Users.get();
}