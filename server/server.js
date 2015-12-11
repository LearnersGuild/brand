/* eslint-disable no-console, no-undef */
process.env.PORT = process.env.PORT || '8080'

import path from 'path'
import Express from 'express'
import serveStatic from 'serve-static'

import configureDevEnvironment from './configureDevEnvironment'
import generateIconsAndMetadata from './generateIconsAndMetadata'
import { replaceSwaggerUiHtml, default as configureSwagger } from './configureSwagger'

const serverPort = parseInt(process.env.PORT, 10)
const baseUrl = process.env.APP_BASEURL || `http://localhost:${serverPort}`

const app = new Express()

if (__DEVELOPMENT__) {
  configureDevEnvironment(app)
}

// Use this middleware to server up static files
app.use(serveStatic(path.join(__dirname, '../dist')))
app.use(serveStatic(path.join(__dirname, '../public')))

console.info('Generating icons and metadata ...')
generateIconsAndMetadata(baseUrl)
  .then((iconsMetadataTags) => {
    console.info('... done generating icons and metadata.')
    replaceSwaggerUiHtml(iconsMetadataTags.join('\n        '))
  })
  .catch((error) => {
    console.error('... ERROR generating icons and metadata:', error)
  })

// Configure Swagger middleware firt, then start app
configureSwagger(app, ()=> {
  // Redirect to Swagger API docs
  app.get('/', (req, res) => res.redirect('/docs/#!/default'))

  app.listen(process.env.PORT, (error) => {
    if (error) {
      console.error(error)
    } else {
      console.info('🌍  Listening at %s', baseUrl)
    }
  })
})
