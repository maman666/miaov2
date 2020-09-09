const express = require('express');
const Router = express.Router();

const db = require('../db');
const formatData = require('../utils/formatData')

// /api/list
Router.get('/',(req,res)=>{
    let sql = `select * from goodlist`

    db.query(sql,(err,data)=>{
        if(err){
            res.send(formatData({code:100,data:err}));
            return;
        }
        res.send(formatData({data}))
    });
})

// /api/list/:category
Router.get('/:id',(req,res)=>{
    // 后面的条件相当于写动态路由
    let sql = `select * from goodlist where id='${req.params.id}'`

    db.query(sql,(err,data)=>{
        if(err){
            res.send(formatData({code:100,data:err}));
            return;
        }
        res.send(formatData({data}))
    });
})


module.exports = Router;