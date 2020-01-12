var express = require('express');
var router = express.Router();
var db = require('../db.js');
//用户模型
exports.findOne = async (data) => {
    //获取用户信息
    var sql = "SELECT * FROM user where username='"+data.username+"'";
    await db.base(sql,{},async (result)=>{
        return result;
    })
}