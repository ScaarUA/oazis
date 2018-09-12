const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const glob = require('glob');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');

module.exports = {
	mode: 'development',
	entry: './src/index.jsx',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'less-loader',
						options: {
							paths: [
								path.resolve(__dirname, 'src/styles'),
								path.resolve(__dirname, 'node_modules')
							],
							sourceMap: true
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new ImageminPlugin({
			externalImages: {
				context: '',
				sources: glob.sync('assets/**/*.*')
			},
			pngquant: {
				quality: 8
			},
			plugins: [
				imageminJpegRecompress({
					quality: 'medium'
				})
			]
		})
	],
	resolve: {
		extensions: ['*', '.js', '.jsx'],
		alias: {
			_features: path.resolve(__dirname, 'src/features/'),
			_scenes: path.resolve(__dirname, 'src/scenes/'),
			_components: path.resolve(__dirname, 'src/components/')
		}
	},
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: __dirname,
		hot: true
	}
};