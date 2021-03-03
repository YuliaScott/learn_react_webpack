/* eslint-disable no-undef */
const commonConfig = require('./webpack.common.config.js');
// webpack-merge v5 (and later)
const { merge } = require('webpack-merge');

module.exports = merge(commonConfig, {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: '/',
                    }
                }
            }
        ]
    }
});