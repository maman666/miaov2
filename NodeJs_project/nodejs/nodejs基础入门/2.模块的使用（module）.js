/**
 * Created by zMouse.
 */

/*
* 一个文件就是一个模块
* 每个模块都有自己的作用域
*
* 我们使用var来申明的一个变量，他并不是全局的，而是属于当前模块下
* */

/*
var a = 100;

console.log(a);//局部访问

global.a = 200;

console.log(a);
console.log(global.a);*/  //全局下访问

//__filename : 当前文件被解析过后的绝对路径

//console.log( __filename );

/*
* 模块加载系统
*
* require('模块');
* */

//require('./2.js');

/*
* 模块加载机制：
*   路径
*       绝对路径
*       相对路径
* */
//require('b:/录制视频/NodeJS/课件/module/2.js');
//require('2.js');    //加载node中的核心模块，或者是node_modules

/*
* 1.首先按照加载的模块的文件名称进行查找
* 2.如果没有找到，则会在模块文件名称后加上.js的后缀，进行查找
* 3.如果还没有找到，则会在文件名称后加上.json的后缀，进行查找
* 4.如果还没有，则会在文件名称后加上.node的后缀，进行查找
*
* 文件名称 -> .js -> .json -> .node
* */
//require('./2');

//require('./3');


/**
 * Created by zMouse.
 */

/*
* 在一个模块中通过var定义的变量，其作用域范围是当前模块，外部不能够直接的访问
* 如果我们想一个模块能够访问另外一个模块中定义的变量，可以：
*   1.把变量作为global对象的一个属性，但是这样的做法是推荐
*   2.使用模块对象 module
* */

//var a = 100;

//global.a = 100;

/*
* module : 保存提供和当前模块有关的一些信息
*
* 在这个module对象，有一个子对象：exports 对象
* 我们可以通过这个对象把一个模块中的局部变量对象进行提供访问
* */

//console.log(module);

// var a = 100;

//module.exports.a = a; //在另一个模块打印出来一个对象 a={100}

/*
* 在模块作用域，还有一个内置的模块对象，exports，他其实就是module.exports
* */

//console.log( module.exports === exports );

//xports.a = a;

//module.exports = [1,2,3];   //exports 和 module.exports 的指向关系已经断开了

//exports.a = 200;

// exports = [1,2,3];



/**
 * Created by zMouse.
 */

/*
* __filename : 返回当前模块文件解析后的绝对路径，该属性其实并非全局的，而是模块作用域下的(文件)
* __dirname : 返回当前模块文件所在目录解析后的绝对路径，该属性也不是全局的，而是模块作用域下的(文件夹)
* */

//console.log(__filename);
//console.log(__dirname);

//var d = new Date();
//var arr = new Array(1,2,3);

setInterval(function() {

    var d = new Date();

    console.log( '现在是：' + d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日 ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() );

}, 1000);
