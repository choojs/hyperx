const path = require('path')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const cfg = minify => ({
	entry: './index.js',
	devtool: 'source-map',
	output: {
		filename: `hyperx${minify ? '.min' : ''}.js`,
		library: 'hyperx',
		libraryTarget: 'umd',
		path: path.join(__dirname, 'dist'),
	},
	plugins: minify ? [new UglifyJsPlugin({
		sourceMap: true,
	})] : [],
})

module.exports = [cfg(false), cfg(true)]
