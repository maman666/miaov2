const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');

var router = new Router();

// 引入页面路由
const registryRouter = require('./registry');
const loginRouter = require('./login');
const tokenverifyRouter = require('./tokenverify');

const imgRouter = require('./img')

router.use(koaBody({
    // 支持formdata
    multipart:true,

    // 文件支持
    formidable:{
        // 指定保存路径
        uploadDir:'./uploads',
        keepExtensions:true,
        // 改文件名
        onFileBegin(filename,file){
            // filename: 上传文件的原始名
            // file:文件信息对象
            //   * path:

            // file.path = './uploads/'+filename
        }
    }
}));

router.use('/registry',registryRouter.routes())//.routes()把对象转函数
router.use('/login',loginRouter.routes())
router.use('/tokenverify',tokenverifyRouter.routes())

router.use('/img',imgRouter.routes())

module.exports = router;