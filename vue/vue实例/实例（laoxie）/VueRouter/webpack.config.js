// 这里的代码在nodejs环境下执行
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    // 入口文件
    entry:'./src/index.js',

    // 出口：打包后文件保存在哪个目录
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'js/[name]-bundle[hash].js',
        publicPath:'/fe/'
    },

    // 测试服务器:在内存中运行
    devServer:{
        contentBase:'./src',
        port:10086,
        open:true, //自动打开浏览器
    },

    resolve:{
        alias:{
            page:path.resolve('src/pages'),
            '@':path.resolve('src')
        },
        extensions:['.js','.json','.vue']
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

            // js加载器
            {
                test:/\.js$/,
                include:path.resolve(__dirname,'./src'),
                use:{
                    loader:'babel-loader',

                    // babel的参数
                    options:{
                        presets:['env','stage-0'],
                        plugins: [
                            "transform-runtime"
                        ]
                    }
                },

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

            // 字体图标处理
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'fonts/[name].[hash:7].[ext]'
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
        new CleanWebpackPlugin(),
        
        // 依据html模板生成一个自动引用你打包后的文件（js或css）的新的html页面
        new HtmlWebpackPlugin({
            template:'./src/index.template.html'
        }),

        new CopyWebpackPlugin([
            {from:'./src/assets/img',to:'assets/img'}
        ]),

        // Vue-loader 15.x之后的版本都需要伴随 VueLoaderPlugin， 否则报错
        new VueLoaderPlugin(),
    ]
}