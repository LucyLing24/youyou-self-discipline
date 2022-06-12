// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
  });
  
const db = cloud.database()
const Users = db.collection("Users")
// 云函数入口函数
exports.main = async (event, context) => {
    console.log(event.openId);
    var intelligenceChange = (event.kind == "智力")? parseInt(event.change) : 0;
    var strengthChange = (event.kind == "体力")? parseInt(event.change): 0;
    var charmChange = (event.kind == "魅力")? parseInt(event.change) : 0;
    var healthChange = (event.kind == "健康")? parseInt(event.change) : 0;
    console.log(await Users.where({
        openId: event.openId
    }).update({
        data:{
            intelligence: db.command.inc(intelligenceChange),
            strength: db.command.inc(strengthChange),
            charm: db.command.inc(charmChange),
            health: db.command.inc(healthChange),
            exp: db.command.inc(5),
        }
    }).then((resp) => {
        console.log(resp);
    }).then((resp) => {
        console.log(Users.where({openId: event.openId}).get());
    }))
}