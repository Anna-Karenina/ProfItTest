const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      webpack = require('webpack'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      TerserJSPlugin = require('terser-webpack-plugin');

   const ENV = process.env.NODE_ENV;
   const isProd = ENV === 'production';

   function setDevTool() {  
    if (isProd) {
      return 'source-map';
    } else {
      return 'eval-source-map';
    }
  }
  const paths = {
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist'), 
    img: path.resolve(__dirname, 'src/public/img'),
  }

const config = {
  context: paths.src,
  watchOptions: {
    ignored: /node_modules/
  },
  optimization: {
    removeAvailableModules: false,
     minimizer: [
      new TerserJSPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma       : 5,
            warnings   : false,
            comparisons: false,
            inline     : 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma      : 5,
            comments  : false,
            ascii_only: true
          }
        },
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
      }),
    ],
    runtimeChunk: true
  },
  entry: {
    app: './index'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devtool: setDevTool(),
  output: {
    path: paths.dist,
    filename: '[name].bundle.js'
  },
  module:{
    rules: [
      {
        test: /\.tsx?$/,
        use:[
          {
          loader: 'cache-loader',
          options: {
            cacheDirectory: path.resolve(
              __dirname,
              'node_modules/.cache/cache-loader'
            ),
          },
        }, 'awesome-typescript-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ]
 }
 if (isProd) {
  config.plugins.push(
      new CopyWebpackPlugin([{
        from: paths.src + '/public',
        to: paths.dist + '/public/',
        ignore: ['*.js', '*.tsx', '*.ts', '*.html'],
    }])
  );
  
}
 module.exports = config