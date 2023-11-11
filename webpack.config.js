const config = {
	mode: 'production',
	entry: {
		index: './src/js/index.js'
	}, // Какие js файлы будем собирать
	output: {
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	}
}

module.exports = config
