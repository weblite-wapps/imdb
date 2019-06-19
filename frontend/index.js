import superagent from 'superagent'
import {setElementSrc} from './helper'

const id = 'tt0109686'

superagent
  .get(`http://localhost:4000/id/${id}`)
  .then(res => res.body)
  .then(setElementSrc)