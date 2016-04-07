import fs from 'fs'
import path from 'path'

export function getAvailableLogos(req, res) {
  const serverPort = parseInt(process.env.PORT, 10)
  const baseURL = process.env.APP_BASEURL
  const assetsPath = path.join(__dirname, '..', '..', 'public', 'assets')
  const logoFiles = fs.readdirSync(assetsPath).filter(filename => filename.match(/^learners-guild-logo/))
  const logoURLs = logoFiles.map(file => `${baseURL}/assets/${file}`)

  res.status(200).json(logoURLs)
}
