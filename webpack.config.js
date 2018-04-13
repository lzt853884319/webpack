const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

let pathsToClean = [
    'dist',
]

module.exports = {
    entry: {
        "app.bundle": './src/app.js',
        "contact": './src/contact.js'
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
            filename: 'style.css',
            disable: true
        }),
         // 热替换
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    }
}