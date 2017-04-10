/* eslint-disable no-console, no-undef */
process.env.PORT = process.env.PORT || '8080'

import path from 'path'
import Express from 'express'
import serveStatic from 'serve-static'

import configureDevEnvironment from './configureDevEnvironment'
import configureSwagger from './configureSwagger'

export function start() {
  const baseUrl = process.env.APP_BASEURL

  const app = new Express()

  if (__DEVELOPMENT__) {
    configureDevEnvironment(app)
  }

  // Use this middleware to server up static files
  app.use(serveStatic(path.join(__dirname, '../dist')))
  app.use(serveStatic(path.join(__dirname, '../public')))

  return Promise.all([
    // Configure Swagger middleware first, then start app
    configureSwagger(app),
  ]).then(() => {
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
}
