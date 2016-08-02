import {Map} from 'immutable'

const LOAD_VS = 'LOAD_VS'
const ADD_VS = 'ADD_VS'
const REMOVE_VS = 'REMOVE_VS'
const REMOVE_ALL_VS = 'REMOVE_ALL_VS'

const defaultState = Map({
  default: []
})


export default function visualStyleState(state = defaultState, action) {

  switch (action.type) {
    case ADD_VS:
      return Map(action.styles)
    case REMOVE_VS:
      return state.delete(action.vsName)
    case REMOVE_ALL_VS:
      return defaultState
    default:
      return state
  }
}

export function fetchVisualStyles(url) {
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! STYLE00000000000')

  console.log(url)

  return dispatch => fetch(url)
    .then(res => {

      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! STYLE1111111111')
      console.log(res)
      return res.json()
    })
    .then(payload => {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! STYLE12222222')
      console.log(payload)
      const styleMap = {}
      payload.map(vs => {
        styleMap[vs.title] = vs.style
      })

      return dispatch(addStyles(styleMap))
    })
    .catch(error => { error });
}


export function addStyles(styles) {
  return {
    type: ADD_VS,
    styles: styles,
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


