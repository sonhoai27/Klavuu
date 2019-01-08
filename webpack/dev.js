const merge = require('webpack-merge');
const webpack = require('webpack');
const { resolve } = require('path');

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
    mode: 'development',
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './index.tsx',
    ],
    output: {
        filename: 'js/[name].[hash].js',
        chunkFilename: "js/[name].[hash].js",
        path: resolve(__dirname, '../build'),
        publicPath: '/'
    },
    devServer: {
        hot: true,
        historyApiFallback: true,
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: ['awesome-typescript-loader'],
        }, ]
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
});