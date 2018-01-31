const path = require('path');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

//服务启动设置
const svrConfig = {
	host: 'localhost',
	port: 3000,
	//是否开启静默模式？true开启，紧显示错误和警告，如要看信息为false。
	noInfo: false
};

//远程代理访问，可以配置多个代理服务
const proxyUrl = /*'http://10.11.115.129:8080/'*/'http://localhost:8888';
const proxyConfig = [
	{
		enable: true, //true启用代理,mock服务失效.
		router: '/', //代理的路由
		url: proxyUrl,
		options: {
			filter: function(req, res) {
				//不需要代理可以排除
				return req.url.indexOf('webpack_hmr') > -1 ? false : true;
			},
			proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
				// you can update headers
				proxyReqOpts.headers['Referer'] = proxyUrl;
				proxyReqOpts.headers['Origin'] = proxyUrl;
				// you can change the method
				// proxyReqOpts.method = 'GET';
				return proxyReqOpts;
			}
		}
	}
];

//静态服务托管
const staticConfig = {
	folder: 'src/static'
};

//提取package里的包
function getVendors() {
	let pkg = require('./package.json');
	let _vendors = [];
	for (const key in pkg.dependencies) {
		_vendors.push(key);
	}
	return _vendors;
}
//优化配置，对于使用CDN作为包资源的引用从外到内的配置
const externals = {
	react: 'React',
	'react-dom': 'ReactDOM',
	'react-router': 'ReactRouter'
};

//默认加载扩展名、相对JS路径模块的配置
const resolve = {
	extensions: [ '.jsx', '.js' ],
	alias: {
		components: path.resolve(__dirname, 'src/components/'),
		assets: path.resolve(__dirname, 'src/assets/'),
		containers: path.resolve(__dirname, 'src/containers/'),
		build: path.resolve(__dirname, 'build/'),
		public: path.resolve(__dirname, 'src/public/'),
	}
};

//开发和生产需要的loader
const rules = [
	{
		test: /\.js[x]?$/,
		exclude: /(node_modules)/,
		include: [ path.resolve('src'), path.resolve('demo') ],
		use: [
			{
				loader: 'babel-loader'
			}
		]
	},
	{
		test: /\.css$/,
		use: ExtractTextPlugin.extract({
			use: [ 'css-loader', 'postcss-loader' ],
			fallback: 'style-loader'
		})
	},
	{
		test: /\.less$/,
		use: ExtractTextPlugin.extract({
			use: [ 'css-loader', 'postcss-loader', 'less-loader' ],
			fallback: 'style-loader'
		})
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
];

//开发环境的webpack配置
const devConfig = {
	devtool: 'cheap-module-source-map',
	entry: {
		// vendors: getVendors(),
		app: [ 'babel-polyfill', './demo/index.js', hotMiddlewareScript ],
		iconfont: './src/static/font/iconfont.js'
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].[hash].js',
		publicPath: '/'
	},
	// externals: externals,
	module: {
		rules: rules
	},
	plugins: [
		new CommonsChunkPlugin({
			name: 'vendors'
		}),
		new ExtractTextPlugin({
			filename: '[name].[hash].css'
		}),
		new webpack.NamedModulesPlugin(),
		new OpenBrowserPlugin({
			url: `http://${svrConfig.host}:${svrConfig.port}`
		}),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './demo/index.html',
			inject: 'body',
			hash: false,
			favicon: './demo/assets/images/favicon.png',
			chunks: [ 'vendors', 'app', 'iconfont' ]
		})
	],
	resolve: resolve
};

//生产环境的webpack配置
const prodConfig = {
	entry: {
		vendors: getVendors(),
		app: [ 'babel-polyfill', './demo/index.js' ],
		iconfont: './src/static/font/iconfont.js'
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].[hash].js',
		publicPath: './'
	},
	externals: externals,
	module: {
		rules: rules
	},
	plugins: [
		new CommonsChunkPlugin({
			name: 'vendors'
		}),
		new ExtractTextPlugin({
			filename: '[name].[hash].css'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new UglifyJSPlugin(),
		new CleanWebpackPlugin([ 'dist' ]),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './demo/index.html',
			inject: 'body',
			hash: true,
			favicon: './demo/assets/images/favicon.png',
			chunks: [ 'vendors', 'app', 'iconfont' ]
		})
	],
	resolve: resolve
};

//最终向uba导出配置文件
module.exports = {
	devConfig,
	prodConfig,
	svrConfig,
	proxyConfig,
	staticConfig
};
