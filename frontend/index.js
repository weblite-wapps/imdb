const W = window.W
const superagent = require('superagent')

// helper
const qualities = {
  '0': '@._V1_QL50',
  '1': '@._V1_UX182_CR0,0,182,268_AL__QL50',
  '2': '@._V1_UX148_CR0,0,148,216_AL__QL50',
  '3': '@._V1_UX86_CR0,0,86,86_AL_',
  '4': '@._V1_UY99_CR43,0,99,99_AL_',
  '5': '@._V1_UX32_CR0,0,32,44_AL_',
}

const poster = document.getElementById('poster')
const imdbBackLogo = document.querySelector('.back-icon')
const body = document.body

const castItem = ({ image, name, role }) => {
  const li = document.createElement('LI')
  li.className = 'cast'

  const img = document.createElement('IMG')
  const ext = image.lastIndexOf('.')
  img.src = image.substring(0, ext) + qualities['2'] + image.substring(ext)
  img.alt = name

  img.className = 'ripple front'

  // For download
  img.addEventListener('click', () => {
    navigator.clipboard.writeText(
      image.substring(0, ext) + qualities['0'] + image.substring(ext),
    )
  })

  // img.addEventListener('error', () => {
  // img.src = require("./assets/profile.png")
  // })

  const innerDiv = document.createElement('DIV')

  const h3 = document.createElement('H3')
  h3.appendChild(document.createTextNode(name))

  const h4 = document.createElement('H4')
  h4.appendChild(document.createTextNode(role))

  innerDiv.appendChild(h3)
  innerDiv.appendChild(h4)

  li.appendChild(img)
  li.appendChild(innerDiv)

  return li
}

const iconsItem = ({ rating, year, runtime }) => {
  document.querySelector("img[alt='start'] + h3").innerText = rating
  document.querySelector("img[alt='year'] + h3").innerText = year
  document.querySelector("img[alt='runtime'] + h3").innerText = runtime
}

const storyItem = story => {
  document.querySelector('.story > p').innerText = story
}

const posterItem = (posterSrc, name) => {
  poster.src = posterSrc
  poster.alt = name
}

const setElementSrc = movieInfo => {
  console.log(movieInfo)
  movieInfo.cast.forEach(item => {
    document.querySelector('.casts').appendChild(castItem(item))
  })

  iconsItem(movieInfo)
  storyItem(movieInfo.story)
  posterItem(movieInfo.poster, movieInfo.title)
}

let state = 'POSTER'
const transitionMaker = () => {
  if (state === 'POSTER') state = 'INFO'
  else state = 'POSTER'

  if (state === 'POSTER') {
    poster.classList.remove('hide')
    body.classList.add('hide')
  } else {
    poster.classList.add('hide')
    body.classList.remove('hide')
  }
}

poster.addEventListener('click', () => {
  console.log(state)
  if (state === 'INFO') return
  transitionMaker()
})

imdbBackLogo.addEventListener('click', () => {
  console.log(state)
  if (state === 'POSTER') return
  transitionMaker()
})


let id = ''
// 

// weblite customize onChangeValue function
function onCustomizeValueChange({ key, value }) {
  if (key === 'id' && value.length === 9) id = value
}

const hooks = {
  wappWillStart: (start, error, { mode }) => {
    if (mode === 'customize') {
      start()
      return
    }

    W.loadData().then(({ customize }) => {
      id = (customize && customize.id)
      superagent
        .get(`https://wapp.weblite.me/imdb/id/${id}`)
        .set('Access-Control-Allow-Origin', '*')
        .then(res => res.body)
        .then(setElementSrc)
        .then(start)
    })
  },
  onCustomizeValueChange,
  onError: () => 'show',
}

  /* 3  main */
  ; (function main() {
    W.setHooks(hooks)
  })() 