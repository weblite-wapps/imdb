// modules
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const imdb = require('imdb-scrapper')

// helper
const getMovieById = id => {
  const funs = [imdb.getFull(id)]
  return Promise.all(funs).then(data => {
    return { ...data[0] }
  })
}

// router
const router = express.Router()
router.get('/id/:id', ({ params: { id } }, res) => {
  getMovieById(id).then(movieInfo => res.send(movieInfo))
})

const app = express()

app.use(cors({ origin: '*' }))
app.use(bodyParser.json())
app.use('/', router)

app.listen(4000, () => console.log('Server Running! on port 4000'))
