const mysql = require('mysql');

//创建连接池
var pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    port:'3306',
    database:'xiangmu'
});

//limit（5,8） 从6开始 运行8条记录
pool.query('select * from goodlist limit 5,8',(err,rows)=>{
    console.log(err,rows);
})

module.exports = pool;