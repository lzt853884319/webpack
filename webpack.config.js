const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'app.bundle.js',
        path: __dirname + '/dist'
    },
    plugins: [new HtmlWebpackPlugin({
        filename: "index.html",
        title: "What mortal",
        hash: true,
        minify:{
            collapseWhitespace: true
        }
    })],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}