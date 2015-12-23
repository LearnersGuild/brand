/* eslint-disable no-undef */
export default function configureAppForDevelopment(/* app */) {
  return new Promise((resolve) => {
    if (__DEVELOPMENT__) {
      // Nothing yet!
    }
    return resolve()
  })
}
