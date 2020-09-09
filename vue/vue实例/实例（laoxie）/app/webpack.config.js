// 这里的代码在nodejs环境下执行
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    // 入口文件
    entry:'./app/app.js',

    // 出口：打包后文件保存在哪个目录
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'js/[name]-bundle[hash].js'
    },

    // 测试服务器:在内存中运行
    devServer:{
        contentBase:'./app',
        port:10086,
        open:true, //自动打开浏览器
    },

    // 配置Loader加载器（某一类文件的编译规则）
    module:{
        rules:[
            // vue单文件组件加载器
            {
                test:/\.vue$/,
                use:{
                    loader:'vue-loader'
                },

                // 简化
                // loader:'vue-loader',
            },

            // css加载器
            {
                test:/\.css$/,
                loader:['style-loader','css-loader']
            },

            // 图片加载器
            {
				test:/\.(?:jpe?g|png|gif)$/,
				use:{
					loader:'url-loader',
					options:{
						limit:10000,
						name: 'img/[name].[hash:8].[ext]'
					}
				}
            },
            
            // sass加载器
            {
                test:/\.scss$/,
                loader:['style-loader','css-loader','sass-loader']
            }
        ]
    },

    // 插件Plugin
    plugins:[
        // 依据html模板生成一个自动引用你打包后的文件（js或css）的新的html页面
        new HtmlWebpackPlugin({
            template:'./app/index.html'
        }),

        // Vue-loader 15.x之后的版本都需要伴随 VueLoaderPlugin， 否则报错
        new VueLoaderPlugin(),
    ]
}