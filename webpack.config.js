/*
* @Author: ChengRen1992
* @Date:   2018-01-21 21:45:33
* @Last Modified by:   Ren
* @Last Modified time: 2018-01-23 08:27:36
*/
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

var getHtmlConfig = function(name){
	return{
		    filename : 'view/'+ name +'.html',
        	template : __dirname+'/src/view/'+ name + '.html',
        	hash     : true,
        	chunks   : ['common',name],
        	inject   : true
	};
};
var config = {
    entry:{
    	'common': [__dirname+'/src/page/common/index.js'],
    	'index' : [__dirname+'/src/page/index/index.js'],
    	'login' : [__dirname+'/src/page/index/login.js'],
    },
    output:{
        path:__dirname+'/dist',
        publicPath:'/dist',
        filename:'js/[name].js'
    },
    externals : {
    	'jquery' : 'window.jQuery'
    },
    module:  {
      loaders:  [
            {test: /\.css$/,loader:  ExtractTextPlugin.extract("style-loader","css-loader")},
            {test: /\.(gif|png|jpg|woff|fvg|eot|ttf)\??.*$/,loader: 'url-loader?limit=100&name=resource/[name].[ext]'}
        
    ]
},
    plugins: [
        //独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
        	name : 'common',
        	minChunks:2,
        	filename : 'js/base.js'
        }),
        //把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]
};

if('dev' == WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;