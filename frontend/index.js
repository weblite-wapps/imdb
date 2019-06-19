import superagent from 'superagent'
import { setElementSrc } from './helper'

W.setHooks({
  wappWillStart(start, error, { mode }) {
    if (mode === 'customize') {
      start()
      return
    }

    W.loadData().then(({ customize }) => {
      const id = (customize && customize.id) || ''
      superagent
        .get(`https://wapp.weblite.me/imdb/id/${id}`)
        .then(res => res.body)
        .then(setElementSrc)
        .then(start)
    })
  },
})