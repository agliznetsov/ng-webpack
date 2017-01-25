'use strict';

var request = require('request');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var release = process.argv.indexOf('--release') !== -1;
var lazy = process.argv.indexOf('--lazy') !== -1;

console.log('release: ', release, ', lazy: ', lazy);
console.log('');

function LazyPlugin(options) {
}

LazyPlugin.prototype.apply = function (compiler) {
    setTimeout(function () {
        //request bundle js to trigger first time compilation
        console.log("fetching bundle js...");
        request('http://localhost:9000/js/app.js');
    }, 500);
};

module.exports = function () {
    var targetFileName = release ? '[name].[hash]' : '[name]';

    var config = {};

    config.entry = {
        app: './src/index.js',
        vendor: [
            './bower_components/lodash/dist/lodash.js',
            './bower_components/jquery/dist/jquery.js',
            './bower_components/angular/angular.js',

            './bower_components/bootstrap/dist/css/bootstrap.min.css'
        ]
    };

    config.output = {
        filename: 'js/' + targetFileName + '.js',
        path: './dist'
    };

    config.module = {
        loaders: [
            {
                test: /src.*\.js$/,
                loaders: ['ng-annotate']
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=css/fonts/[name].[ext]&publicPath=../'
            }
        ]
    };

    config.plugins = [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: 'head'
        }),
        new ExtractTextPlugin('css/' + targetFileName + '.css'),
        new CopyWebpackPlugin([
            {from: 'src/static', to: 'static'}
        ])
    ];

    config.devServer = {
        proxy: {
            '/api': {
                target: 'http://localhost:8080'
            }
        }
    };

    if (release) {
        config.plugins.push(new webpack.optimize.UglifyJsPlugin());
    } else {
        config.devtool = 'source-map';
        config.output.publicPath = 'http://localhost:9000/';
    }

    if (lazy) {
        config.plugins.push(new LazyPlugin());
    }
    return config;
}();
