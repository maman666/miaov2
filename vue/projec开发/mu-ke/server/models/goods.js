var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var produtSchema = new Schema({
  "productId":{type:String},
  "productName":String,
  "salePrice":Number,
  "checked":String,
  "productNum":Number,
  "productImage":String
});

module.exports = mongoose.model('Good',produtSchema); //输出一个为Goood集合 自动去数据库查找为goods这个集合  如果数据库没有+s 第三个参数必须为'goods'


