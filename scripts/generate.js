require('babel-core/register')

const generateIconsAndMetadata = require('../server/generateIconsAndMetadata').default
const replaceSwaggerUiHtml = require('../server/configureSwagger').replaceSwaggerUiHtml

function run() {
  console.info('Generating icons and metadata ...')

  if (process.env.NODE_ENV === 'development') {
    require('dotenv').load()
  }

  const serverPort = parseInt(process.env.PORT, 10)
  const baseUrl = process.env.APP_BASEURL || `http://localhost:${serverPort}`
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
