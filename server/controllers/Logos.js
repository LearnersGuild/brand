import fs from 'fs'
import path from 'path'

export function getAvailableLogos(req, res) {
  const baseURL = process.env.APP_BASEURL
  const assetsPath = path.join(__dirname, '..', '..', 'public', 'assets')
  const logoFiles = fs.readdirSync(assetsPath).filter(filename => filename.match(/(png|svg|jpg)/i))
  const logoURLs = logoFiles.map(file => `${baseURL}/assets/${file}`)

  res.status(200).json(logoURLs)
}
