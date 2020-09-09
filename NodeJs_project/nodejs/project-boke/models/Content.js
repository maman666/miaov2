
var mongoose =require('mongoose');
//引入表结构
var contentsSchema = require('../schemas/contents');
//创造模型类
module.exports = mongoose.model('Content',contentsSchema);