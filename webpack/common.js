const webpack = require('webpack');
const paths = require("./path");
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

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
            exclude: /\.none.(scss)$/,
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
            test: /\.scss$/,
            include: /\.none.(scss)$/,
            use: [
              {
                loader: "style-loader"
              },
              {
                loader: "css-loader",
              },
              { loader: "postcss-loader" },
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
            { from: paths.resolveApp('public/sw.js'), to: paths.resolveApp('build/sw.js') },
            { from: paths.resolveApp('public/css/'), to: paths.resolveApp('build/css') }
        ]),
    ],
    externals: {
        CKEDITOR: 'CKEDITOR'
    },
    node: { fs: "empty" }
}