
var express = require('express');

var router = express.Router();

var Category = require('../models/Category');
var Content = require('../models/Content');

var data;

//处理通用数据
router.use((req,res,next)=>{
    data={
        userInfo: req.userInfo,
        categories: []
    }
    //读取所有的分类标签信息
    Category.find().then(function(categories) {
        data.categories = categories;
        next();
    });
})


// 首页
router.get('/', (req, res, next) => {
    // console.log(req.userInfo)
    //获取前端传过来标签分类id
    data.category = req.query.category || '';
    data.count = 0;
    data.page = Number(req.query.page || 1);
    data.limit = 10;
    data.pages = 0;

    var where = {};
    if(data.category){
        where.category = data.category
    }

    
   
       //读取内容的输出
       Content.where(where).count().then(function(count) {

        data.count = count;
        //计算总页数
        data.pages = Math.ceil(data.count / data.limit);
        //取值不能超过pages
        data.page = Math.min( data.page, data.pages );
        //取值不能小于1
        data.page = Math.max( data.page, 1 );

        var skip = (data.page - 1) * data.limit;

        return Content.where(where).find().limit(data.limit).skip(skip).populate(['category', 'user']).sort({
            addTime: -1
        });

    }).then((contents)=>{
        data.contents = contents;
        // console.log(data);
         // 第二个参数：传递给模板使用的数据 
         res.render('main/index',data);
    })

})

//阅读全文
router.get('/view',(req,res)=>{
    var contentId = req.query.contentid || '';
    Content.findOne({
        _id:contentId
    }).then((content)=>{
        data.content = content;
        // console.log(data);
        content.views++;
        content.save();
        
        res.render('main/view',data);
    })
})

module.exports = router;