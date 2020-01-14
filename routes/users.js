var express = require('express');
var router = express.Router();
var db = require('./db.js');

//获取用户信息
router.get('/index', function(req, res, next) {
  let att = req.query;
  var sql_count = "SELECT count(*) as total FROM user_list";
  var pageSize = (att.page - 1) * att.pageSize;
  var sql_data = "SELECT * FROM user_list limit " + pageSize + " , " + att.pageSize;
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
//删除
router.delete('/:id', function(req, res, next) {
  var id = req.params.id
  var sql = "DELETE FROM user_list where id=" + id;
  db.base(sql,{},()=>{
    res.json('删除成功');
  })
});
//新增
router.post('/add', function(req, res, next) {
  var data = req.body
  let str = "'"+data.username +"','"+data.address+"','"+data.phone+"','"+data.email+"'";
  var sql = `INSERT INTO user_list (username,address,phone,email) value (${str})`;
  db.base(sql,data,()=>{
    res.json('新增成功');
  })
});



module.exports = router;
