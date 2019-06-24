const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env) => {
  const isProduction = env === 'production';
  const webpackEnv = new webpack.EnvironmentPlugin({
    GRAPHQL_ENDPOINT: 'http://localhost:4000'
  });

  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: 'styles.css'  }),
      webpackEnv
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
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      node: 'current'
                    }
                  }
                ],
                '@babel/preset-react'
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                [
                  'import',
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: 'css'
                  }
                ]
              ]
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