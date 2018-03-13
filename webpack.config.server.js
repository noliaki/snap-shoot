const webpack = require('webpack')
const path = require('path')
const glob = require('glob')
const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
]
const paths = require('./scripts/paths')

const config = {
  target: 'node',
  mode: process.env.NODE_ENV,
  context: paths.docroot,
  entry: {
    'index': path.resolve('./src/server/entry.ts')
  },
  output: {
    path: path.resolve('./dist/server'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig.server.json'
        }
      }
    ]
  },
  plugins
}

if (process.env.NODE_ENV === 'development') {
  config.watch = true
  config.cache = true
  config.plugins = plugins.concat([
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ])
}

module.exports = config
