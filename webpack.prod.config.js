/* eslint-disable no-undef */
const commonConfig = require('./webpack.common.config.js');
// webpack-merge v5 (and later)
const { merge } = require('webpack-merge');

module.exports = merge(commonConfig, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]', //将图片打包到/dist/images/目录
                        publicPath: '/dist/',
                    }
                }
            }
        ]
    }
});