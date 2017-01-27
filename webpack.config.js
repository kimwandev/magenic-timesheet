const webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
let extractCSS = new ExtractTextPlugin('styles/[name].css');
let extractLESS = new ExtractTextPlugin('styles/[name]-custom.css');

const config = {
    devtool: 'inline-source-map',
    entry : {
        main: './app/PageRouter.js'
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
                presets: ['es2015', 'react']
            }
        },
        { test: /\.css$/, loader: extractCSS.extract(['css-loader']) },
        { test: /\.less$/i, loader: extractLESS.extract(['css-loader','less-loader']) },
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff&name=./fonts/[name].[ext]" },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=./fonts/[name].[ext]" },
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