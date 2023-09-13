import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
let test = path.resolve('src');

export default {    
	mode: 'development',
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.resolve('dist'),
        filename: 'build.[contenthash].js'        
    },        
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ],
    module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		],
	}
};
