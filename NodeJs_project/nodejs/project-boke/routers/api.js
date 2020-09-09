
var express = require('express');

var router = express.Router();

//引入模型类操作数据库
var User = require('../models/User');
var Content = require('../models/Content');

//统一返回格式
//初始化
var responseData;

router.use(function(req,res,next){
    responseData = {
        code:null,
        message:''
    }
    next();
});

/*
* 用户注册
*   注册逻辑
*
*   1.用户名不能为空
*   2.密码不能为空
*   3.两次输入密码必须一致
*
*   1.用户是否已经被注册了
*       数据库查询
*
* */
//用户注册 post必须用到body-parser中间件 作为获取请求参数
router.post('/user/register',(req,res,next)=>{
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;

    //用户是否为空
    if(username == ''){
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    }

    //密码不能为空
    if (password == '') {
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }

    //两次输入的密码必须一致
    if (password != repassword) {
        responseData.code = 3;
        responseData.message = '两次输入的密码不一致';
        res.json(responseData);
        return;
    }

    //用户名是否被注册
    User.findOne({
        username:username
    }).then(function(userInfo){
        if(userInfo){
            //表示数据库中有该记录
            responseData.code=4;
            responseData.message = '用户名已经被注册了';
            res.json(responseData);
            return;
        }
        //保存用户注册的信息到数据库中(通过模型类操作把数据存入数据库)
        var user = new User({
            username:username,
            password:password
        });
        return user.save();
    }).then(function(newUserInfo){
        console.log(newUserInfo)
        responseData.code = 0;
        responseData.message='注册成功';
        res.json(responseData);
    });
    
});

//用户登陆
router.post('/user/login',(req,res)=>{
    let {username,password} = req.body;
    if(username=='' || password==''){
        responseData.code=1;
        responseData.message='用户名或者密码不能为空';
        res.json(responseData);
        return;
    }
    //查询数据库中相同用户名和密码的记录是否存在，如果存在则登录成功
    User.findOne({
        username:username,
        password:password
    }).then(userInfo=>{
        if(!userInfo){
            responseData.code=2;
            responseData.message='用户名或者密码错误';
            res.json(responseData);
            return;
        }
        //用户名和密码是正确的
        responseData.code=0;
        responseData.message='登陆成功';
        responseData.userInfo={
            _id:userInfo._id,
            username:userInfo.username
        }
        req.cookies.set('userInfo',JSON.stringify({
            _id:userInfo._id,
            username:userInfo.username
        }))
        res.json(responseData);

    })
})

//退出
router.get('/user/logout',(req,res)=>{
    req.cookies.set('userInfo',null);
    responseData.code=0;
    responseData.message='退出成功';
    res.json(responseData);
})




//评论提交
router.post('/comment/post',(req,res)=>{
    var contentId = req.body.contentid;
    var postData = {
        // 表结构字段是一个数组 定一下数组的组成 评论人 时间 内容
        username:req.userInfo.username,
        postTime:new Date(),
        content:req.body.content
    }

    //查询当前内容的信息
    Content.findOne({
        _id:contentId
    }).then(content=>{
        content.comments.push(postData);
        return content.save();
    }).then(newContent=>{
        responseData.message='评论成功';
        responseData.code=0;
        responseData.data = newContent;
        res.json(responseData);
    })
})

//获取指定文章的所有评论
router.get('/comment',(req,res)=>{
    var contentId = req.query.contentid;
    Content.findOne({
        _id:contentId
    }).then(content=>{
        responseData.data = content.comments;
        res.json(responseData);
    })
})

module.exports=router;