import {handleActions} from 'redux-actions'
import {Map} from 'immutable'

const defaultState = Map({
  selected: ''
})

export default handleActions({
  SELECTED: (state, action) => (
    state.set('selected', action.payload)
  )
}, defaultState)
