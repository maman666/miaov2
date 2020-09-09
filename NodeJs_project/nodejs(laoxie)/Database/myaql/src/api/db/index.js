//npm安装mysql模块
const mysql = require('mysql');

//创建连接池

var pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    port:3306,
    database:'xiangmu'
})

module.exports = pool;