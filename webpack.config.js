const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const bootstrapEntryPoints = require('./webpack.bootstrap.config')


let pathsToClean = [
    'dist',
]
const isProd = process.env.NODE_ENV === 'production';//true or false
var bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    //resolve-url-loader may be chained before sass-loader if necessary
    use: ['css-loader', 'sass-loader']
  })
  
const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
    entry: {
        "app.bundle": './src/app.js',
        "contact": './src/contact.js',
        "bootstrap": bootstrapConfig
    },
    output: {
        filename: '[name].[hash].js',
        path: __dirname + '/dist'
    },
    devServer: {
        port: 9000,
        open: true,
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(pathsToClean),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: "index.html",
            title: "What mortal",
            hash: true,
            minify:{
                collapseWhitespace: true
            },
            excludeChunks: ['contact']
        }),
        new HtmlWebpackPlugin({
            template: './src/contact.html',
            filename: "contact.html",
            hash: true,
            chunks: ['contact'],
            minify:{
                collapseWhitespace: true
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: !isProd,
            publicPath: 'css/'
        }),
         // 热替换
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
          }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig
            },
            { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000&name=[name].[ext]&outputPath=fonts/' },
            { test: /\.(ttf|eot)$/, loader: 'file-loader?name=[name].[ext]&outputPath=fonts/' },
            { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            }

        ]
    }
}