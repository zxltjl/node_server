
var db = require('../db.js');
//用户模型
exports.findOne = async (data) => {
    //获取用户信息
    var sql = "SELECT * FROM user where username='"+data.username+"'";
    return new Promise(resolve=>{
        db.base(sql,{},(result)=>{
            resolve(result);
        })
    }) 
}