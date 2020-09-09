
var mongoose =require('mongoose');
//引入表结构
var usersSchema = require('../schemas/users');
//创造模型类
module.exports = mongoose.model('User',usersSchema);