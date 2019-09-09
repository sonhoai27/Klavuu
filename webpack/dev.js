const paths = require('./path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
    mode: 'development',
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        paths.appIndexJs,
    ],
    output: {
        filename: 'js/[name].[hash].js',
        chunkFilename: "js/[name].[hash].js",
        path: paths.appDevPath,
        publicPath: '/'
    },
    devServer: {
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/api/v1': {
                target: 'http://localhost:8000',
                secure: false,
                changeOrigin: true,
                headers: {
                       Connection: 'keep-alive'
                }
            },
          }
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
});