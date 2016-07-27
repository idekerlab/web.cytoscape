import {handleActions} from 'redux-actions'
import {Map} from 'immutable'

const defaultState = Map({
  event: null,
  value: {}
})

export default handleActions({
  SELECTED: (state, action) => ({
    event: 'SELECTED'
  }),
  UNSELECTED: (state, action) => ({
    event: 'UNSELECTED'
  })
}, defaultState)
