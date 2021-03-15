/* eslint-disable indent */
/* eslint-disable no-undef */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Analyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DashboardPlugin = require('webpack-dashboard/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let ENV = process.env.ENV;
let isProd = ENV === 'production';

module.exports = {
    entry: './src/index.js',
    output: {
        ////注释代码分片
        // filename: isProd ? 'bundle@[chunkhash].js' : '[name].js', //:'bundle.js',
        filename: isProd ? 'bundle@[chunkhash].js' : 'bundle.js',
    },
    mode: ENV,
    devtool: 'source-map',
    optimization: {
        minimize: true,
    },
    ////注释代码分片
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all'
    //     }
    // },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                }
            }, 'postcss-loader'],
            exclude: /node_modules/, //node_modules中的模块不会执行这条规则 #/src\/pages/
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: '/',
                }
            }
        }, {
            test: /\.(js|jsx)$/,
            use: {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true, //缓存机制, 重复打包未改变的模块防止二次编译
                    presets: [
                        [
                            '@babel/env', {
                                modules: false, //禁用模块语句的转化, 将ES6 Module的语法交给Webpack本身处理
                            }
                        ],
                        [
                            '@babel/preset-react', {
                                modules: false,
                            }
                        ]
                    ],
                }
            },
            exclude: /node_modules/
        },
        {
            test: /\.js$/,
            use: 'eslint-loader',
            enforce: 'pre',
            exclude: /node_modules/,
        }
        ]
    },
    devServer: {
        // publicPath: '/', //用于确定bundle的来源，并具有优先级高于contentBase
        contentBase: './public', //页面打开的url是以devServer中的contentBase作为当前查询目录，只要文档不在contentBase所指定的目录中，就只会显示cannot get
        hot: true
    },
    plugins: [
        ////输出动态HTML
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        ////生成bundle模块组成结构图
        new Analyzer(),
        ////更好地展示打包信息
        new DashboardPlugin(),
        ////打包时拷贝文件
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public/img/',
                    to: 'img/',
                }
            ]
        })
    ]
}