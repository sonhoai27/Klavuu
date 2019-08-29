const merge = require('webpack-merge');
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
    }
});