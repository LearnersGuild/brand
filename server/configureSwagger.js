import fs from 'fs'
import path from 'path'
import swaggerTools from 'swagger-tools'
import YAML from 'yamljs'

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const swaggerDoc = YAML.load(path.join(__dirname, '../config/swagger-icons.yaml'))

function getControllers() {
  const files = fs.readdirSync(path.join(__dirname, 'controllers'))
  const controllers = {}
  for (const i in files) {
    const file = files[i]
    if (file.match(/\.js$/)) {
      const controllerName = file.replace(/\.js$/, '')
      const controllerFunc = require(`./controllers/${controllerName}`)
      controllers[controllerName] = controllerFunc
    }
  }
  return controllers
}

export default function configureSwagger(app, next) {
  // Initialize the Swagger middleware
  swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata())

    // Validate Swagger requests
    app.use(middleware.swaggerValidator())

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter({ controllers: getControllers() }))

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi())

    // Start the server
    return next()
  })
}
