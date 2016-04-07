require('babel-core/register')

const generateIconsAndMetadata = require('../server/generateIconsAndMetadata').default
const replaceSwaggerUiHtml = require('../server/configureSwagger').replaceSwaggerUiHtml

function run() {
  /* eslint-disable no-console */
  console.info('Generating icons and metadata ...')

  if (process.env.NODE_ENV === 'development') {
    require('dotenv').load()
  }

  const baseUrl = process.env.APP_BASEURL
  generateIconsAndMetadata(baseUrl)
    .then((iconsMetadataTags) => {
      console.info('... done generating icons and metadata.')
      replaceSwaggerUiHtml(iconsMetadataTags.join('\n        '))
    })
    .catch((error) => {
      console.error('... ERROR generating icons and metadata:', error)
    })
}

if (!module.parent) {
  run()
}
