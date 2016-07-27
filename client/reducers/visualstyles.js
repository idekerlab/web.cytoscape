import { Map } from 'immutable'

const ADD_VS = 'ADD_VS'
const REMOVE_VS = 'REMOVE_VS'
const REMOVE_ALL_VS = 'REMOVE_ALL_VS'


const defaultState = Map({
  'default': {}
})

export default function visualStyleState(state = defaultState, action) {

  switch (action.type) {

    case ADD_VS:
      return state.set(action.vsName, action.visualStyle)
    case REMOVE_VS:
      return state.delete(action.vsName)
    case REMOVE_ALL_VS:
      return defaultState
    default:
      return state
  }
}

export function addVs(vsName, vs) {
  return {
    type: ADD_VS,
    vsName: vsName,
    visualStyle: vs
  }
}

export function removeVs(vsName) {
  return {
    type: REMOVE_VS,
    vsName: vsName
  }
}

export function removeAllVs() {
  return {
    type: REMOVE_ALL_VS
  }
}


