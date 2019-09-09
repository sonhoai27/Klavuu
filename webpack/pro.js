const merge = require('webpack-merge');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const commonConfig = require('./common');
const paths = require('./path');

module.exports = merge(commonConfig, {
    mode: 'production',
    entry: paths.appIndexJs,
    output: {
        filename: 'js/[name].[hash].js',
        chunkFilename: "js/[name].[hash].js",
        path: paths.appProdPath,
        publicPath: paths.appPath
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                minify(file, sourceMap) {
                    const extractedComments = [];

                    const { error, map, code, warnings } = require("uglify-js") // Or require('./path/to/uglify-module')
                        .minify(file, {});

                    return { error, map, code, warnings, extractedComments };
                },
                uglifyOptions: {
                    warnings: false,
                    parse: {},
                    compress: {},
                    mangle: true,
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_fnames: false
                }
            })
        ],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
});