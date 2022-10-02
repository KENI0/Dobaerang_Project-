const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const {VueLoaderPlugin} = require("vue-loader")

module.exports = { 
  //확장자 생략 가능 
  resolve: {
    extensions: [".js",".vue"],
    alias: {
      '~' : path.resolve(__dirname,'src'),
    }
  },
  //파일을 읽어들이기 시작하는 진입점
  entry: './src/main.js',
  //결과물을 반환하는 지점 
  output: { 
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },

      {
        test: /\.s?css$/,
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: 'file-loader'
      }
    ]
  },

  //번들링 후 결과물의 처리 방식을 관리해주는 플러그인 설정부분 
  plugins: [
    new HtmlWebpackPlugin( {
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
        {from: 'static'}
      ]
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true
  }
}