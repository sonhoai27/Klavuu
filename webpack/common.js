const webpack = require('webpack');
const paths = require("./path");
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const babelLoader = {
    loader: 'babel-loader',
    options: {
        cacheDirectory: true,
        presets: ["@babel/preset-env", "@babel/preset-react", "next"],
        comments: true,
        compact: false,
        plugins: ['@babel/plugin-syntax-dynamic-import']
    },
};

module.exports = {
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
          "react-dom": "@hot-loader/react-dom",
          "@app": paths.appSrc
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader', 'source-map-loader'],
        },
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [babelLoader, 'ts-loader'],
        },
        {
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            },
            {
                loader: require.resolve('css-loader'),
                options: {
                    importLoaders: 1,
                    modules: true,
                    localIdentName: "sh__[hash:base64:25]",
                }
            },
            { loader: 'postcss-loader' },
            {
                loader: "sass-loader"
            }
            ]
        },
        {
            test: /\.css$/,
            use: [
                { loader: 'style-loader' },
                {
                    loader: require.resolve('css-loader'),
                },
                { loader: 'postcss-loader' }
            ],
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
            ],
        }
        ]
    },
    plugins: [
        new CheckerPlugin(),
        new webpack.ProvidePlugin({}),
        new HtmlWebpackPlugin({
            template: paths.appHtml
        }),
        new HardSourceWebpackPlugin(),
        new CopyWebpackPlugin([
            { from: paths.resolveApp('public/manifest.json'), to: paths.resolveApp('build') },
            { from: paths.resolveApp('public/images/'), to: paths.resolveApp('build/images') },
            { from: paths.resolveApp('public/css/'), to: paths.resolveApp('build/css') },
            { from: paths.resolveApp('public/ckeditor/'), to: paths.resolveApp('build/ckeditor') },
        ]),
    ],
    externals: {
        CKEDITOR: 'CKEDITOR'
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
    node: { fs: "empty" }
}