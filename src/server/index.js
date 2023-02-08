import got from 'got'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

const PORT = 9000

const app = express()
app.use(cors()).use(morgan('dev'))

const loadRemoteFeed = async (url) => {
  try {
    const headers = {
      'Accept-Charset': 'utf-8'
    }
    const data = await got(url, { headers }).text()
    return data
  } catch (err) {
    return err.message
  }
}

app.get('/test', (_, res) => {
  res.send('ok')
})
app.get('/proxy/getxml', async (req, res) => {
  const url = req.query.url
  try {
    const xml = await loadRemoteFeed(url)
    return res.type('text/xml').send(xml)
  } catch (error) {
    console.log('error', error)
  }
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
