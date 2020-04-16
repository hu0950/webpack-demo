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
  output: {
    // filename: 'bundle.js',
    publicPath: "",
    filename: '[name]_[hash].js', // 考虑到CDN缓存的问题，我们一般会给文件名加上hash, name匹配entry key
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.(jpg|png|gif)$/,
      use: {
        // url-loader 和 file-loader 类似，url-loader多了limit的配置
        loader: 'url-loader',
        options: {
          // 定义打包到dist目录中图片的文件格式
          // placeholder-占位符
          name: '[name]_[hash].[ext]',
          outputPath: 'images/',
          // 若image超过limit的值，打包成图片文件；否则，打包成base64
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
            // 0 => no loaders (default)
            // 对于在css中再引入其它css的场景，每次处理，都会再依次先调用sass-loader和postcss-loader 2个loader
            importLoaders: 2
          }
        },
        'sass-loader',
        'postcss-loader'
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 指定index.html的模板
      template: 'src/index.html'
    })
  ]
}