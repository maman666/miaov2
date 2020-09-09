
var mongoose =require('mongoose');
//引入表结构
var categoriesSchema = require('../schemas/categories');
//创造模型类
module.exports = mongoose.model('Category',categoriesSchema);