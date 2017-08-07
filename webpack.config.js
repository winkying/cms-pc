const path = require('path');
const resolve = require('path').resolve
const webpack = require('webpack')
// const MockWebpackPlugin = require('mock-webpack-plugin');
// const proxy = require('./mock/config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const StringReplacePlugin = require('string-replace-webpack-plugin')


var args = require("args");
const url = require('url')

//命令行参数
args
  .option("minify", "minify html css js files (default is false, do not minify code.)", false)
  .option("env", "env properties file path (default is env/dev.properties)", "")
  .option("output", "the output directory of building (default is dist)", "dist");

const publicPath = '';

const options = args.parse(process.argv);

const envFile = '';

if(options.env){
  envFile = require(options.env);
}





const paths = {
  src:'src'
}

const commonJsFiles = [
  './src/common/sessionStorage.js',
  './src/common/localStorage.js',
  './src/common/loading.js',
  './src/common/cookie.js',
  './src/common/auth.js',
  './src/common/browser.js',
  './src/common/network.js',
  './src/common/utils.js',
  './src/common/api-request.js',
  './src/common/mall-setting.js',
  './src/common/distribution.js',
  './src/common/weixinshare.js',
  './src/common/price-stock.js',
  './src/common/promotion-icon.js',
  './src/common/sys-time.js',
  './src/common/filters.js',
  './src/common/scroll-loading.js',
  './src/common/app-dnd.js'
];

module.exports = (options = {}) => ({
  entry: {
    common: commonJsFiles,
    vendor: ['./src/libs/vendor.js'],
    index: ['./src/main.js']
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',
    publicPath: options.dev ? '/assets/' : publicPath
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[name].[ext]'
          }
        }]
      },
      /* {
        test:/\.(js|vue|css|less)$/,
        loader:StringReplacePlugin.replace({
          replacements:[
            {
              pattern:/\$\{(\w*?)\}/ig,
              replacement:function(match, pro, offset, string){
                return (envFile && envFile[pro]) || ''
              }
            }
          ]
        })
      } */
    ]
  },
  stats: {
    hideModules: options.dev ? false : true
  },
  plugins: [
    new StringReplacePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'common', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      progress: options.dev ? false : true
    }),
    //copy libs to dist/libs
    /* new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      }
    }), */
     new CopyWebpackPlugin([
      {
        from:'./src/mock',
        to:resolve(__dirname, 'dist/mock')
      }
    ]), 

    /* new MockWebpackPlugin({
      config:proxy,
      port:3000
    }) */
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    //host: 'lyfadmin.dev.laiyifen.com',
    port: 80,
    disableHostCheck: true, 
    /* proxy:{
      '/cms':{
        target:'http://lyfadmin.dev.laiyifen.com',
         secure: false
      }
    }, */
    /* historyApiFallback: {
      index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    } */
  },
  devtool: options.dev ? '#eval-source-map' : '#source-map'
})