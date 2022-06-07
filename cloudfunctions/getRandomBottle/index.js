// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
  });
  
const db = cloud.database()
const Bottles = db.collection("Bottles")
// 云函数入口函数
exports.main = async (event, context) => {
    const countResult = await Bottles.count()
    console.log(countResult)
    const total = countResult.total;
    console.log(total)
    const rand = Math.floor(total * Math.random());
    const chosen = await Bottles.skip(rand).limit(1).get();
    return chosen.data[0];
}