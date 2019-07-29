// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
//
// module.exports = {
// 	mode: 'development',
// 	entry: {
// 		main: './src/index.js'
// 	},
// 	module: {
// 		rules: [{
// 			test: /\.(jpg|png|gif)$/,
// 			use: {
// 				loader: 'url-loader',
// 				options: {
// 					name: '[name]_[hash].[ext]',
// 					outputPath: 'images/',
// 					limit: 10240
// 				}
// 			}
// 		},{
// 			test: /\.scss$/,
//       use: [
//         'style-loader',
//         {
//           loader: 'css-loader',
//           options: {
//             importLoaders: 2, // 对于在css中再引入其它css的场景，每次处理，都会再依次先调用sass-loader和postcss-loader
//             // 0 => no loaders (default);
//             // 1 => postcss-loader;
//             // 2 => postcss-loader, sass-loader
//             modules: true
//           },
//         },
//         'postcss-loader',
//         'sass-loader'
//       ],
// 		},{
//       test: /\.(eot|ttf|svg)$/,
//       use: {
//         loader: 'file-loader'
//       }
//     }]
// 	},
//   plugins: [
//   	new HtmlWebpackPlugin({
//       template: 'src/index.html'
// 		}),new CleanWebpackPlugin(['dist'])
// 		// 先删除dist目录，保证dist目录下都是最新的打包结果，不需要手动清除
// 	],
//   output: {
// 		filename: 'bundle1.js',
// 		path: path.resolve(__dirname, 'dist')
// 	}
// }
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8080  // 跨域接口代理
  },
  entry: {
    main: './src/index.js'
  },
  module: {
    rules: [{
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'images/',
          limit: 10240
        }
      }
    }, {
      test: /\.(eot|ttf|svg)$/,
      use: {
        loader: 'file-loader'
      }
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        },
        'sass-loader',
        'postcss-loader'
      ]
    }]
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html'
  }), new CleanWebpackPlugin(['dist'])],
  output: {
    // filename: 'bundle.js',
    filename: '[name].js', // name匹配entry key
    path: path.resolve(__dirname, 'dist')
  }
}