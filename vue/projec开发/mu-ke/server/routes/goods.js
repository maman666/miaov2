var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');
var User = require('../models/user');


//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/muke');


//监听连接成功
mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});

//监听连接报错 失败
mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});

//监听连接中断
mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});


//查询商品列表数据 价格排序 价格区间查询 分页
router.get('/list', (req, res, next) => {
  let page = parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize);
  let sort = req.query.sort;
  let priceLevel = req.query.priceLevel;
  let skip = (page - 1) * pageSize;
  console.log(page, pageSize, sort)
  let params = {};
  if (priceLevel != 'all') {
    switch (priceLevel) {
      case '0': priceGt = 0; priceLte = 100; break;
      case '1': priceGt = 100; priceLte = 500; break;
      case '2': priceGt = 500; priceLte = 1000; break;
      case '3': priceGt = 1000; priceLte = 5000; break;
    }
    params = {
      salePrice: {
        $gt: priceGt,
        $lte: priceLte
      }
    }
  }

  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({ 'salePrice': sort });
  //exec(cb)即执行完后将调用callback函数,你可以传一个函数进去 可以进行排序 分页
  goodsModel.exec((err, doc) => {
    if (err) {
      res, json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        message: '查询数据成功',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

// 加入到购物车
router.post('/addCart', (req, res, next) => {
  let userId = '100000077';
  let productId = req.body.productId;
  // console.log(productId)
  User.find({ userId: userId }, (err, userDoc) => {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      })
    } else {
      // console.log('userDoc:',userDoc);
      if (userDoc) {
        let goodsItem = '';
        userDoc[0].cartList.forEach(item => {
          if (item.productId == productId) {
            goodsItem = item;
            item.productNum++;
          }
        })
        if (goodsItem) {
          userDoc[0].save((err2, doc2) => {
            if (err2) {
              res.json({
                status: "1",
                msg: err2.message
              })
            } else {
              res.json({
                status: "0",
                msg: '加入成功',
                result: 'success'
              })
            }
          })
        } else {
          Goods.findOne({ productId: productId }, (err1, doc) => {
            if (err1) {
              res.json({
                status: "1",
                msg: err1.message
              })
            } else {
              if (doc) {
                // console.log("doc:",doc)

                doc.productNum = 1;
                doc.checked = 1;
                userDoc[0].cartList.push(doc);
                //  不再模型类定义字段 在这里也可以
                // userDoc[0].cartList.push({
                //   "productId":doc.productId,
                //   "productName":doc.productName,
                //   "salePrice":doc.salePrice,
                //   "productImage":doc.productImage,
                //   "productNum":1,
                //   "checked":1
                // })
                userDoc[0].save((err2, doc2) => {
                  if (err2) {
                    res.json({
                      status: "1",
                      msg: err2.message
                    })
                  } else {
                    res.json({
                      status: "0",
                      msg: '加入成功',
                      result: 'success'
                    })
                  }
                })
              }
            }
          })
        }

      }
    }
  })

})


module.exports = router;
