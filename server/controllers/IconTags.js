import path from 'path'

export function getHTMLMetadataTags(req, res) {
  const filename = path.join(__dirname, '..', '..', 'dist', 'icons-metadata.json')
  res.sendFile(filename, null, (err) => {
    if (err) {
      res.status(err.status).end()
    }
  })
}
