//应用程序的启动（入口）文件

//加载express模块
var express = require('express');
//加载模板处理模块
var swig = require('swig');
//加载数据库模块
var mongoose = require('mongoose');
//加载body-parser，用来处理post提交过来的数据
var bodyParser = require('body-parser');
//加载cookies模块 保存登陆状态 就不会一刷新就没了
var Cookies = require('cookies');

//引入数据模型类
var User = require('./models/User');

//创建app应用 => NodeJS Http.createServer();
var app = express();

//设置静态文件托管
//当用户访问的url以/public开始，那么直接返回对应__dirname + '/public'下的文件
app.use( '/public', express.static( __dirname + '/public') );

//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
app.engine('html',swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views','./views');
//注册所使用的模板引擎，第一个参数必须是 view engine，第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的
app.set('view engine','html');
//在开发过程中，需要取消模板缓存
swig.setDefaults({cache:false});

//bodyparser设置
app.use(bodyParser.urlencoded({extended:true}));

//中间件设置cookie
app.use((req,res,next)=>{
    req.cookies = new Cookies(req,res);
    // 解析登陆用户的cookie信息 通过get方法获取
    req.userInfo={};
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            //获取当前登录用户的类型，是否是管理员
            User.findById(req.userInfo._id).then(userInfo=>{
                    req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })
        }catch(e){
            next();
        }
    }else{
        next();
    }
   
});

/*
* 根据不同的功能划分模块
* */
app.use('/admin',require('./routers/admin')); //后台模块
app.use('/api',require('./routers/api')); //api模块
app.use('/',require('./routers/main')); //前台模块


// 匹配到对应的规则进行渲染
// app.get('/',(req,res,next)=>{
//     // res.send('欢迎来我的博客')
//     /*
//         读取views目录下的指定文件，解析并返回客户端
//         第一个参数：表示模板文件，相对于views目录 views/index.html
//         第二个参数：传递给模板使用的数据 分配模板（用于保存登陆信息面板 不会刷新就没了）
//     */
//    res.render('index');
// })

// 静态文件css实例 太麻烦 设置静态文件托管
// app.get('/main.css',(req,res,next)=>{
//     res.setHeader('content-type','text/css')
//     res.send('body {background:red}');
// })

//监听http请求
mongoose.connect('mongodb://localhost:27017/boke',(err)=>{
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
        app.listen(8081,()=>{
            console.log('服务已经启动，端口号为8081')
        });
    }
})


/**
 * 用户发送http请求->url->路由解析（后端路由解析）->找到匹配规则->执行绑定的函数->返回对应的内容给用户
 * 
 * /public->静态资源->直接读取指定目录下文件，返回给用户
 * ->动态资源->处理业务逻辑，加载模板，解析模板->返回数据给用户
 * 
 * * */