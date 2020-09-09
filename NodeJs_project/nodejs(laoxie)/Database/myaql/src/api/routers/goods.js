const express = require('express');
const Router = express.Router();

const db = require('../db');
const formatData = require('../utils/formatData');

Router.get('/:id',(req,res)=>{
    let sql = `select * from goodlist where id=${req.params.id}`
    db.query(sql,(err,data)=>{
        if(err){
            res.send(formatData({code:100,data:err}));
            return;
        }
        res.send(formatData({data}))
    })
})

module.exports = Router;