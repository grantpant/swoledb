const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  const isProduction = env === 'production';

  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: 'styles.css'  }),
      new Dotenv({ path: !isProduction ? './config/dev.env' : '' })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        },
        {
          test: /\.s?css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }
          ]
        }
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true
    },
    // If the rebuild times get too slow, you can change it back to
    // 'cheap-module-eval-source-map' for development.
    devtool: isProduction ? 'source-map' : 'inline-source-map'
  };
};