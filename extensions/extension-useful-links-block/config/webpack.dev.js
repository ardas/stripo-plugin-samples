const paths = require('./paths')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  /**
   * Mode
   *
   * Set the mode to development or production.
   */
  mode: 'development',

  /**
   * Devtool
   *
   * Control how source maps are generated.
   */
  devtool: 'inline-source-map',

  /**
   * DevServer
   *
   * Spin up a server for quick development.
   */
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 3006,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range",
      "Access-Control-Expose-Headers": "Content-Length,Content-Range"
    }
  },

  plugins: [
    /**
     * HotModuleReplacementPlugin
     *
     * Only update what has changed.
     */
    new webpack.HotModuleReplacementPlugin(),
  ],
})
