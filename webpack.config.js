const webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
let extractCSS = new ExtractTextPlugin('[name].css');
let extractLESS = new ExtractTextPlugin('[name]-custom.css');

const config = {
    devtool: 'inline-source-map',
    entry : {
        main: './app/PageRouter.jsx'
    },
    output:{
        path: __dirname + '/public/',
        filename: 'js/[name].js'
    },
    module:{
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query:{
                presets: ['es2015', 'react', 'stage-2']
            }
        },
        { test: /\.css$/, loader: extractCSS.extract(['css-loader']) },
        { test: /\.less$/i, loader: extractLESS.extract(['css-loader','less-loader']) },
        {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/font-woff"
        }, 
        {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/font-woff"
        }, 
        {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/octet-stream"
        }, 
        {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file"
        }, 
        {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=image/svg+xml"
        },
        { test: /\.(png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?name=./images/[name].[ext]" }]
    },
    plugins:[
        extractCSS,
        extractLESS
    ],
    devServer:{
        contentBase: './public',
        colors:true,
        historyApuFallback:true,
        inline:true
    }
}

if(process.env.NODE_ENV === 'production'){
    config.devtool = false;

}

module.exports = config;