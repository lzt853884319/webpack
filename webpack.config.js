const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'app.bundle.js',
        path: __dirname + '/dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: "index.html",
            title: "What mortal",
            hash: true,
            minify:{
                collapseWhitespace: true
            }
        }),
        new ExtractTextPlugin('style.css')
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    }
}