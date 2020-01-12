var express = require('express');
var router = express.Router();
var db = require('./db.js');

//获取用户信息
router.get('/', function(req, res, next) {
  var sql = "SELECT * FROM user";
  db.base(sql,{},(result)=>{
    res.json(result);
  })
});

module.exports = router;
