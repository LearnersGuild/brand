/* eslint-disable no-undef */
require('babel-core/register')

// These may also be defined by webpack on the client-side.
global.__SERVER__ = true
global.__DEVELOPMENT__ = process.env.NODE_ENV === 'development'

if (process.env.NODE_ENV === 'production') {
  require('newrelic')
}

if (__DEVELOPMENT__) {
  if (require('piping')()) {
    // application logic here
    require('dotenv').load()
    require('./server').start()
  }
} else {
  require('./server').start()
}
