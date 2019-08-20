const merge = require('webpack-merge');
const { resolve } = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const commonConfig = require('./common');

module.exports = merge(commonConfig, {
    mode: 'production',
    entry: './index.tsx',
    output: {
        filename: 'js/[name].[hash].js',
        chunkFilename: "js/[name].[hash].js",
        path: resolve(__dirname, '../build'),
        publicPath: '/dev/'
    },
    stats: {
        colors: false,
        hash: true,
        timings: true,
        assets: true,
        chunks: true,
        chunkModules: true,
        modules: true,
        children: true,
    },
    plugins: [],
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                sourceMap: true,
                uglifyOptions: {
                    compress: {
                        inline: false
                    }
                },
                test: /\.js(\?.*)?$/i,
                cache: true,
            })
        ]
    }
});