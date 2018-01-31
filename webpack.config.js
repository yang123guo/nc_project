var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	cache: false,
	entry: {
		index: './src/index'
	},
	output: {
		path: path.join(process.cwd(), './build'),
		filename: 'index.js',
		library: 'nc-lightapp-front',
		libraryTarget: 'umd'
	},
	externals: {
		react: {
			root: 'React',
			var: 'React',
			commonjs: 'react',
			commonjs2: 'react',
			amd: 'react'
		},
		'react-dom': {
			root: 'ReactDOM',
			var: 'ReactDOM',
			commonjs: 'react-dom',
			commonjs2: 'react-dom',
			amd: 'react-dom'
		}
	},
	module: {
		rules: [
			{
				test: /\.js[x]?$/,
				exclude: /(node_modules)/,
				include: path.resolve('src'),
				use: [
					{
						loader: 'babel-loader'
					}
				]
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: 'style-loader' // creates style nodes from JS strings
					},
					{
						loader: 'css-loader' // translates CSS into CommonJS
					},
					{
						loader: 'less-loader' // compiles Less to CSS
					}
				]
			},
			{
				test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
				exclude: /favicon\.png$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: '[name].[hash:8].[ext]'
						}
					}
				]
			},
			{
				test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[hash:8].[ext]'
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: [ '.jsx', '.js' ],
		alias: {
			components: path.resolve(__dirname, 'src/components/'),
			assets: path.resolve(__dirname, 'src/assets/'),
			containers: path.resolve(__dirname, 'src/containers/'),
			build: path.resolve(__dirname, 'build/')
		}
	}
	// plugins: [ new ExtractTextPlugin('styles.css') ]
};
