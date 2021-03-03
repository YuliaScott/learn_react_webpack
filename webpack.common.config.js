/* eslint-disable indent */
/* eslint-disable no-undef */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Analyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const DashboardPlugin=require('webpack-dashboard/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(process.cwd(), 'dist'), //必须配置这行代码，否则无法删除/dist/目录中的文件(写法不止一种)
    },
    devtool: 'source-map',
    optimization: {
        minimize: true,
    },
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
            ////配置在开发和生产环境各自的配置文件中
            // }, {
            //     test: /\.(png|svg|jpg|gif)$/,
            //     use: {
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name].[ext]',
            //             publicPath: '/dist/',
            //         }
            //     }
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
        // new DashboardPlugin(),
        ////自动清除上一次打包构建目录文件
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['./dist/*'] //配置./dist/*或./dist/images/*,测试无差别(20210302)
        }),
    ]
}