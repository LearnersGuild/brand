/* eslint-disable no-undef */
require('babel/register')

// These may also be defined by webpack on the client-side.
global.__SERVER__ = true
global.__DEVELOPMENT__ = process.env.NODE_ENV === 'development'

if (__DEVELOPMENT__) {
  if (require('piping')()) {
    // application logic here
    require('dotenv').load()
    require('./server')
  }
} else {
  require('./server')
}
