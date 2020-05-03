const yaml = require('js-yaml')
const fs = require('fs')

const SETTINGS = yaml.safeLoad(
  fs.readFileSync(`settings.${process.env.NODE_ENV || 'development'}.yaml`, 'utf8')
)

const clientConfig = require('./client-config')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        token: SETTINGS.SANITY_READ_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd
      }
    }
  ]
}
