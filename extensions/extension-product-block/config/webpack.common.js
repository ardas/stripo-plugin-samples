const paths = require('./paths')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  /**
   * Entry
   *
   * The first place Webpack looks to start building the bundle.
   */
  entry: [paths.src + '/js/index.js'],

  /**
   * Output
   *
   * Where Webpack outputs the assets and bundles.
   */
  output: {
    path: paths.build,
    filename: '[name].extension.js',
    publicPath: '/',
  },

  /**
   * Plugins
   *
   * Customize the Webpack build process.
   */
  plugins: [
    /**
     * CleanWebpackPlugin
     *
     * Removes/cleans build folders and unused assets when rebuilding.
     */
    new CleanWebpackPlugin(),

    /**
     * CopyWebpackPlugin
     *
     * Copies files from target to destination folder.
     *
     */
    new CopyWebpackPlugin({
      patterns: [{
        from: paths.static,
        to: 'assets',
      }],
    }),
  ],

  /**
   * Module
   *
   * Determine how modules within the project are treated.
   */
  module: {
    rules: [
      /**
       * JavaScript
       *
       * Use Babel to transpile JavaScript files.
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'raw-loader'
      }
    ],
  },
}
