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
    if(result.length){
        if(result[0].password===data.password){
            var key = '@#$node_demo'
            const token = jwt.sign({
                unique_key:key,
                username: result.username,
                id: result.id
            }, 'my_token', { expiresIn: '7d' });
            return res.send({
                code: '000001',
                data: {
                    token:{value:token},
                    userinfo:result[0]
                },
                msg: '登录成功'
            })
        }else{
            return res.status(400).send({
                code: '000002',
                data: null,
                msg: '用户名或密码错误'
            })
        }

    }else{
        return res.status(400).send({
            code: '000002',
            data: null,
            msg: '用户名或密码错误'
        })
    }
});

module.exports = router;