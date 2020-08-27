const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //installed via npm
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const IS_DEV = (process.env.NODE_ENV === 'development');

module.exports = {
  mode: IS_DEV ? 'development' : 'production',
  // Enable source code maps for debug on development
  devtool: IS_DEV ? 'inline-source-map' : undefined,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      // JS (ES)
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              // Prevent Babel from bloating code
              // https://webpack.js.org/loaders/babel-loader/#babel-is-injecting-helpers-into-each-file-and-bloating-my-code
              '@babel/plugin-transform-runtime',
              // Add rest spread operatior support (i.e. ...)
              '@babel/plugin-proposal-object-rest-spread',
            ],
          },
        },
      },
      // Styles
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Extract to chunks
          // https://webpack.js.org/plugins/mini-css-extract-plugin/#advanced-configuration-example
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: IS_DEV,
            },
          },
          'css-loader',
          'resolve-url-loader',
          'sass-loader',
        ],
      },
      // Images
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              runtimeCompat: true,
            },
          },
          'svgo-loader',
        ],
      },
    ],
  },
  plugins: [
    // Generates base index.html and inserts bundles
    new HtmlWebpackPlugin({template:"./src/index.html"}),
    // Generates CSS chunks
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new SpriteLoaderPlugin()
  ],
};
