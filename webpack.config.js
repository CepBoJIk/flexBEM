const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const PATHS = {
  source: path.resolve(__dirname, 'app'),
  build: path.resolve(__dirname, 'dist')
}

module.exports = function(env) {
  console.log(env)
  if (env === 'development') {
    return common;
  }
  if (env === 'production') {
    return merge([common, babel, uglify]);
  }
  if (env === 'production:github') {
    return merge([common, babel, uglify, githubPagesPrefix]);
  }
}

const common = {
  mode: 'development',
  entry: PATHS.source + '/index.js',
  output: {
    path: PATHS.build,
    filename: 'script.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          failOnError: true
        }
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader?name=img/[name].[ext]'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
    })
  ]
};

const babel = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}

const uglify = {
  optimization: {
    minimize: true
  }
}

const githubPagesPrefix = {
  output: {
    publicPath: '/flexBEM/'
  }
}



