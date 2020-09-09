
var express = require('express');

var router = express.Router();

//通过模型类操作数据库
var User = require('../models/User');
var Category = require('../models/Category');
var Content = require('../models/Content');

// 对管理员做判断 不是非管理员url地址 /admin进入 防止
router.use((req, res, next) => {
    if (!req.userInfo.isAdmin) {
        res.send('对不起，只有管理员才可以进入后台管理');
        return;
    }
    next();
})

//匹配对象路由 渲染 第二个参数给模板传参
router.get('/', (req, res, next) => {
    res.render('admin/index', {
        userInfo: req.userInfo
    });
})

// 用户管理
router.get('/user', (req, res) => {
    /*
    * 从数据库中读取所有的用户数据
    *
    * limit(Number) : 限制获取的数据条数
    *
    * skip(2) : 忽略数据的条数
    *
    * 每页显示2条
    * 1 : 1-2 skip:0 -> (当前页-1) * limit
    * 2 : 3-4 skip:2
    * */
    //    get方法用query取参 post方法 body
    var page = Number(req.query.page || 1);
    var limit = 10;
    var pages = 0;

    //查询总条数
    User.count().then(count => {
        //    console.log(count);

        // 计算总页数 向上取整
        pages = Math.ceil(count / limit);
        //取值不能超过pages（总页数）
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);
        //同时页限定了skip的取值
        var skip = (page - 1) * limit;

        User.find().limit(limit).skip(skip).then(users => {
            // console.log(users) //数组 数组里面是对象
            res.render('admin/user_index', {
                userInfo: req.userInfo,
                users: users,
                count: count,
                pages: pages,
                limit: limit,
                page: page
            })
        })
    })

})

// 分类首页(展示所有数据)
router.get('/category', (req, res) => {
    /*
    * 从数据库中读取所有的用户数据
    *
    * limit(Number) : 限制获取的数据条数
    *
    * skip(2) : 忽略数据的条数
    *
    * 每页显示2条
    * 1 : 1-2 skip:0 -> (当前页-1) * limit
    * 2 : 3-4 skip:2
    * */
    //    get方法用query取参 post方法 body
    var page = Number(req.query.page || 1);
    var limit = 10;
    var pages = 0;

    //查询总条数
    Category.count().then(count => {
        //    console.log(count);

        // 计算总页数 向上取整
        pages = Math.ceil(count / limit);
        //取值不能超过pages（总页数）
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);
        //同时页限定了skip的取值
        var skip = (page - 1) * limit;

        /* sort排序
            * 1: 升序
            * -1: 降序
            * */
        Category.find().sort({ _id: -1 }).limit(limit).skip(skip).then(categories => {
            // console.log(users) //数组 数组里面是对象
            res.render('admin/category_index', {
                userInfo: req.userInfo,
                categories: categories,
                count: count,
                pages: pages,
                limit: limit,
                page: page
            })
        })
    })

})

//查看get分类
router.get('/category/add', (req, res) => {
    res.render('admin/category_add', {
        userInfo: req.userInfo
    })
})

//分类的保存post
router.post('/category/add', (req, res) => {
    // console.log(req.body.name )
    var name = req.body.name || '';
    if (name == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '名称不能为空'
        })
        return;
    }
    //查看数据库是否已经存在该分类了
    Category.findOne({
        name: name
    }).then(data => {
        // console.log(res)
        if (data) {
            //数据库存在该分类
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类已经存在'
            })
            return Promise.reject();
        } else {
            //不存在，可以保存 new一个Category模型类构造函数 把数据保存到数据库
            return new Category({
                name: name
            }).save();
        }
    }).then(newCategory => {
        // console.log(newCategory)
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '分类保存成功',
            url: '/admin/category'
        })
    })
})

// 分类修改
router.get('/category/edit', function (req, res) {

    //获取要修改的分类的信息，并且用表单的形式展现出来
    var id = req.query.id || '';

    //获取要修改的分类信息
    Category.findOne({
        _id: id
    }).then(function (category) {
        if (!category) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            });
        } else {
            res.render('admin/category_edit', {
                userInfo: req.userInfo,
                category: category
            });
        }
    })

});

// 分类修改保存
router.post('/category/edit', (req, res) => {
    //id以get方式提交过来 
    var id = req.query.id || '';
    //获取post提交过来的名称
    var name = req.body.name || '';
    Category.findOne({
        _id: id
    }).then(function (category) {
        if (!category) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            });
            return Promise.reject();
        } else {
            //当用户没有做任何的修改提交的时候
            if (name == category.name) {
                res.render('admin/success', {
                    userInfo: req.userInfo,
                    message: '修改成功',
                    url: '/admin/category'
                });
                return Promise.reject();
            } else {
                //要修改的分类名称是否已经在数据库中存在 $ne不等于
                //return出来  通过then方法调用
                return Category.findOne({
                    //mongodb每一个id生成都不一样 所以用$ne
                    _id: { $ne: id },
                    name: name
                })
            }

        }
    }).then(sameCategory => {
        if (sameCategory) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '数据库中已经存在同名分类'
            });
            return Promise.reject();
        } else {
            return Category.update({
                //条件
                _id: id
            }, {
                    //要修改的值
                    name: name
                })
        }
    }).then(() => {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '修改成功',
            url: '/admin/category'
        });
    })
})

// 分类删除
router.get('/category/delete', (req, res) => {
    //获取删除id
    var id = req.query.id || '';
    Category.remove({
        _id: id
    }).then(() => {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除成功',
            url: '/admin/category'
        });
    })
})


/*
* 内容首页
* */
router.get('/content', (req, res) => {
    /*
    * 从数据库中读取所有的用户数据
    *
    * limit(Number) : 限制获取的数据条数
    *
    * skip(2) : 忽略数据的条数
    *
    * 每页显示2条
    * 1 : 1-2 skip:0 -> (当前页-1) * limit
    * 2 : 3-4 skip:2
    * */
    //    get方法用query取参 post方法 body
    var page = Number(req.query.page || 1);
    var limit = 10;
    var pages = 0;

    //查询总条数
    Content.count().then(count => {
        //    console.log(count);

        // 计算总页数 向上取整
        pages = Math.ceil(count / limit);
        //取值不能超过pages（总页数）
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);
        //同时页限定了skip的取值
        var skip = (page - 1) * limit;

        /* sort排序
            * 1: 升序
            * -1: 降序
            * 
            * populate 数据表结构 关联字段方法
            * category 关联字段名称 ref：Category 关联哪个表
            * */
        Content.find().sort({ _id: -1 }).limit(limit).skip(skip).populate(['category','user']).sort({addTime:-1}).then(contents => {
            console.log(contents) //数组 数组里面是对象
            res.render('admin/content_index', {
                userInfo: req.userInfo,
                contents: contents,
                count: count,
                pages: pages,
                limit: limit,
                page: page
            })
        })
    })

})

/*
 * 内容添加页面
 * */
router.get('/content/add', (req, res) => {
    Category.find().sort({ _id: -1 }).then((categories) => {
        // console.log(categories)
        res.render('admin/content_add', {
            userInfo: req.userInfo,
            categories: categories
        })
    })

})

//内容保存
router.post('/content/add', (req, res) => {
    // console.log(req.body);
    if (req.body.category == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容分类不能为空'
        })
        return;
    }
    if (req.body.title == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容标题不能为空'
        })
        return;
    }

    //保存数据到数据库
    new Content({
        category: req.body.category,
        title: req.body.title,
        //用户的登陆状态会保存到cookie
        user: req.userInfo._id.toString(),
        description: req.body.description,
        content: req.body.content
    }).save().then(data => {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '数据保存成功',
            url: '/admin/content'
        })
    })
})


//修改内容
router.get('/content/edit', (req, res) => {
    var id = req.query.id || '';
    var categories = [];
    Category.find().sort({ _id: 1 }).then(data => {
        categories = data;
        return Content.findOne({
            _id: id
        }).populate('category');
    }).then(content => {
        console.log(content)
        if (!content) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '指定内容不存在'
            });
            return Promise.reject();
        } else {
            res.render('admin/content_edit', {
                userInfo: req.userInfo,
                categories:categories,
                content: content
            })
        }
    })

})

/*
 * 保存修改内容
 * */
router.post('/content/edit',(req,res)=>{
    // console.log(req.body)
    var id = req.query.id || '';
    if ( req.body.category == '' ) {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容分类不能为空'
        })
        return;
    }

    if ( req.body.title == '' ) {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容标题不能为空'
        })
        return;
    }
    Content.update({
        //内容修改的条件
        _id: id
    }, {
        //保存的内容
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
    }).then(function() {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '内容保存成功',
            url: '/admin/content/edit?id=' + id
        })
    });
})

/*
* 内容删除
* */
router.get('/content/delete',(req,res)=>{
    var id = req.query.id || '';
    Content.remove({
        _id:id
    }).then(()=>{
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'内容删除成功',
            url:'/admin/content'
        })
    })
})

//后台退出
router.get('/logout',(req,res)=>{
    req.cookies.set('userInfo',null);
    res.render('admin/success',{
        message:'退出成功',
        url:'/'
    })
})

module.exports = router;