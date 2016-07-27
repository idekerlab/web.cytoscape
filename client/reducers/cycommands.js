import {handleActions} from 'redux-actions'
import {Map} from 'immutable'

const defaultState = Map({
  command: '',
  value: {}
})

export default handleActions({
  FIT_NETWORK: (state, action) => ({
    command: 'fit'
  }),
  ZOOM_IN_NETWORK: (state, action) => ({
    command: 'zoomIn'
  }),
  ZOOM_OUT_NETWORK: (state, action) => ({
    command: 'zoomOut'
  }),
  RESET: (state, action) => ({
    command: ''
  })
}, defaultState)