var express = require('express');
var router = express.Router();
var db = require('./db.js');
const crypto = require('./models/crypto');
//获取用户信息
router.get('/index', function(req, res, next) {
  let att = req.query;
  var pageSize = (att.page - 1) * att.pageSize;
  let condition = '';
  if(att.name){
    condition="where username='"+att.name+"'"
  }else{
    condition = '' 
  }
  var sql_count = "SELECT count(*) as total FROM user "+condition;
  var sql_data = "SELECT * FROM user "+condition+" limit " + pageSize + " , " + att.pageSize;
  db.base(sql_count,{},(result)=>{
    let obj = result[0]
    let meta = obj
    db.base(sql_data,{},(result)=>{
      let data = {
        meta,
        data:result
      }
      res.json(data);
    })
  })
});

//新增
router.post('/add', function(req, res, next) {
  var data = req.body
  let str = "'"+data.username +"','"+data.nickname+"','"+crypto.md5(data.password)+"','"+data.phone+"','"+data.email+"'";
  var sql = `INSERT INTO user (username,nickname,password,phone,email) value (${str})`;
  console.log(sql)
  db.base(sql,data,()=>{
    res.json('新增成功');
  })
});
//删除
router.delete('/:id', function(req, res, next) {
  var id = req.params.id
  var sql = "DELETE FROM user where id=" + id;
  db.base(sql,{},()=>{
    res.json('删除成功');
  })
});
module.exports = router;
