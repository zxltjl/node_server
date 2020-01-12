var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require('./models/userModel.js');

router.post('/', async (req,res) => {
    const data = req.body;
    if(!data.username || !data.password){
        return res.status(400).send({
            code: '000002',
            data: null,
            msg: '参数不合法'
        })
    }
    const result = await userModel.findOne({
        username: data.username,
        password: data.password
    })
    console.log(result);
    if(result){
        const token = jwt.sign({
            username: result.username,
            _id: result._id
        }, 'my_token', { expiresIn: '2h' });
        return res.send({
            code: '000001',
            data: token,
            msg: '登录成功'
        })
    }else{
        return res.status(400).send({
            code: '000002',
            data: null,
            msg: '用户名或密码错误'
        })
    }
});

module.exports = router;