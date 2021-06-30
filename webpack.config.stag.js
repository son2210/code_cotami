const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const publicPath = '/'

module.exports = webpackMerge.smart(baseConfig, {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    publicPath: publicPath
  },
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BASE_API_URL: JSON.stringify('https://api-staging.cotami.com/'),
        NODE_ENV: JSON.stringify('production'),
        ENCRYPTION_KEY: JSON.stringify(
          'cmsaZWC38bsPL9aHp+PXXfrHIKEhBqgNL5KwcKY74Qw='
        ),
        LOCAL_STORAGE_KEY: JSON.stringify('cotami-staging'),
        SECRET_TOKEN_KEY: JSON.stringify('staging/SECRET_TOKEN_KEY'),
        SECRET_USER_KEY: JSON.stringify('staging/SECRET_USER_KEY'),
        RESET_PASSWORD_TOKEN_KEY: JSON.stringify(
          'staging/RESET_PASSWORD_TOKEN_KEY'
        )
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        configuration: {
          minimize: {
            compress: { warnings: false }
          }
        }
      }
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    })
  ]
})
