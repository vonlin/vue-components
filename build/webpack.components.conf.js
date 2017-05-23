var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var vueLoaderConfig = require('./vue-loader.conf')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

//需要作为组件导出的路径
var vuecompoPath="./src/";

baseWebpackConfig.entry={
  "vc": vuecompoPath+"vc"
}
baseWebpackConfig.output={
  path: config.build.assetsRoot,
  // 文件地址，使用绝对路径形式
  filename: utils.assetsPath('../[name].min.js'),
  //[name]这里是webpack提供的根据路口文件自动生成的名字
  publicPath: './',
  // 公共文件生成的地址
  library: 'vc',
  libraryTarget: 'umd'
};
baseWebpackConfig.devtool="#source-map";
baseWebpackConfig.module = {
  rules: [
    {
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [resolve('test')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueLoaderConfig
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src'), resolve('test')]
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    },
    {
      test:/\.css$/,
      loader: 'style-loader!css-loader',
      include: [resolve(config.build.assetsSubDirectory)]
    }
  ]
}
baseWebpackConfig.plugins = (baseWebpackConfig.plugins || []).concat([
  // this allows uglify to strip all warnings
  // from Vue.js source code.
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  // This minifies not only JavaScript, but also
  // the templates (with html-minifier) and CSS (with cssnano)!
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
])


module.exports = baseWebpackConfig
