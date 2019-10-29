const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        //polyfill: ['./node_modules/regenerator-runtime/runtime', './node_modules/core-js/index.js'],
        app: './src/app.js',
    },
    output: {
        path: path.resolve(__dirname, '../', 'dist'),
        filename: '[name].js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ExtractTextWebpackPlugin('app.css'),
        new HtmlWebpackPlugin({
            title: 'News Viewer',
            inject: 'head'
        })
    ],
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                //use: ['style-loader', 'css-loader', 'sass-loader'],
                use: ExtractTextWebpackPlugin.extract([
                    'css-loader',
                    'sass-loader'
                ])
            }
        ]
    }
}
