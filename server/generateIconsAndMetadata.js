import fs from 'fs.extra'
import path from 'path'
import favicons from 'favicons'


function saveIcons(directory, images) {
  const savedFiles = []
  for (const img of images) {
    const absFilename = path.join(directory, img.name)
    savedFiles.push(fs.writeFile(absFilename, img.contents, 'binary'))
  }
  return Promise.all(savedFiles)
}

function saveFiles(directory, files) {
  const savedFiles = []
  for (const file of files) {
    const absFilename = path.join(directory, file.name)
    savedFiles.push(fs.writeFile(absFilename, file.contents, 'utf-8'))
  }
  return Promise.all(savedFiles)
}

function saveHtmlIconsMetadata(directory, html) {
  return new Promise((resolve) => {
    const absFilename = path.join(directory, 'icons-metadata.json')
    // It's okay to swallow the unlink error -- we don't care if the file doesn't exist.
    fs.unlink(absFilename, (/* err */) => fs.writeFileSync(absFilename, JSON.stringify(html), 'utf-8'))
    resolve()
  })
}

export default function generateIconsAndMetadata(baseUrl) {
  return new Promise((resolve, reject) => {
    // workaround favicons bug
    // (see: https://github.com/evilebottnawi/favicons/issues/103)
    const escBaseUrl = baseUrl.replace('://', ':\\\\')
    const publicDir = path.join(__dirname, '..', 'public')
    const publicAssetsDir = path.join(publicDir, 'assets')
    const distDir = path.join(__dirname, '..', 'dist')
    const sourceImage = path.join(publicAssetsDir, 'learners-guild-icon.png')
    const config = {
      appName: 'icons',                           // Your application's name. `string`
      appDescription: 'Icons Service',            // Your application's description. `string`
      developerName: 'Learners Guild',            // Your (or your developer's) name. `string`
      developerURL: 'https://learnersguild.org',  // Your (or your developer's) URL. `string`
      background: '#fff',             // Background colour for flattened icons. `string`
      path: escBaseUrl,               // Path for overriding default icons path. `string`
      url: baseUrl,                   // Absolute URL for OpenGraph image. `string`
      display: 'standalone',          // Android display: 'browser' or 'standalone'. `string`
      orientation: 'portrait',        // Android orientation: "portrait" or "landscape". `string`
      version: null,                  // Your application's version number. `number`
      logging: false,                 // Print logs to console? `boolean`
      online: false,                  // Use RealFaviconGenerator to create favicons? `boolean`
      icons: {
        android: true,                // Create Android homescreen icon. `boolean`
        appleIcon: true,              // Create Apple touch icons. `boolean`
        appleStartup: true,           // Create Apple startup images. `boolean`
        coast: true,                  // Create Opera Coast icon. `boolean`
        favicons: true,               // Create regular favicons. `boolean`
        firefox: true,                // Create Firefox OS icons. `boolean`
        opengraph: true,              // Create Facebook OpenGraph image. `boolean`
        twitter: true,                // Create Twitter Summary Card image. `boolean`
        windows: true,                // Create Windows 8 tile icons. `boolean`
        yandex: true                  // Create Yandex browser icon. `boolean`
      }
    }

    favicons(sourceImage, config, (error, response)=> {
      if (error) {
        reject(error)
      } else {
        fs.mkdirpSync(distDir)
        Promise.all([
          saveIcons(distDir, response.images),
          saveFiles(distDir, response.files),
          saveHtmlIconsMetadata(distDir, response.html),
        ]).then(() => resolve(response.html))
      }
    })
  })
}
